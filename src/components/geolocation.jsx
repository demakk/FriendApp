import React, {useEffect, useState} from "react";
import Backendless from "backendless";
import '../styles/form-styles.css';


const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function Geolocation() {

    const [user, setUser] = useState({})
    const [geolocations, setGeolocations] = useState([])
    const [description, setDescription] = useState('')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    function handleMoveEnd(position) {
        setPosition(position);
    }

    const getUser = async () => {
        try{
            setUser(await Backendless.UserService.getCurrentUser())
        } catch(err) {
            console.error(err)
        }
    }

    const fetchData = async () => {
        const data = await Backendless.Data.of('Place').find()
        data.forEach(place => {
            if(user.objectId === place.ownerId) {
                place.isOwn = true
            }
        })
        setGeolocations(data)
        console.log(data)
    }

    const addPlace = async () => {
        try {
            const geoData = {
                "type": "Point",
                "coordinates": [
                    longitude,
                    latitude
                ]
            }
            const res = await Backendless.Data.of('Place').save({description, place: geoData})

            setDescription('')
            setLongitude('')
            setLatitude('')
        } catch(err) {
            Backendless.Logging.setLogReportingPolicy( 1, 1 );
            Backendless.Logging.getLogger('add-geo-place').error(err.message)
            console.log(err)
        }
    }

    const findByDescription = async () => {
        try {
            const whereClause = `description = '${description}'`
            const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause)
            const data = await Backendless.Data.of('Place').find(queryBuilder)
            setGeolocations(data)
            setDescription('')
        } catch(err) {
            console.log(err)
        }
    }

    const deletePlace = async (placeId, placeOwner) => {
        try {
            console.log(user.objectId, placeOwner)
            if(user.objectId === placeOwner) {
                const res = await Backendless.Data.of('Place').remove({objectId: placeId})
                alert('Place was removed')
            } else {
                alert('You have not created it.')
            }
        } catch(err) {
            console.log(err)
        }
    }

    const likePlace = async objectId => {
        try {
            const place = geolocations.filter(place => place.objectId === objectId)
            await Backendless.Data.of('Place').save({
                objectId,
                likes: place[0].likes + 1
            })
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUser()
    })

    return (
        <div className="form-container">
            <div className="register-form-group">
                <div className="">
                    <label htmlFor="description">Description</label>
                    <input name="description" type="text" value={description} onChange={e => setDescription(e.target.value)}/><br /><br />

                    <label htmlFor="longitude">Longitude</label>
                    <input name="longitude" type="text" value={longitude} onChange={e => setLongitude(+e.target.value)}/><br /><br />

                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude" type="text" value={latitude} onChange={e => setLatitude(+e.target.value)}/><br /><br />
                </div>
                <div className="buttons">
                    <button className="btn-small" onClick={addPlace}>Add</button>
                    <button className="btn-small" onClick={findByDescription}>Find by description</button>
                    <button className="btn-small" onClick={fetchData}>Get places</button>
                </div>
                <div className="place-container">
                    {geolocations.map((geolocation, index) => {
                        return (
                            <div>
                                <div className="place-content" key={index}>
                                    <div>{geolocation.isOwn? 'Own': ''}</div>
                                    <div>{geolocation.description}</div>
                                    <div className="geo-data">
                                        <div>Longitude: {geolocation.place?.x}</div>
                                        <div>Latitude: {geolocation.place?.y}</div>
                                    </div>
                                    <button className="btn-submit btn-mg" onClick={() => deletePlace(geolocation.objectId, geolocation.ownerId)}>Delete</button>
                                    <button className="btn-submit btn-mg" onClick={() => likePlace(geolocation.objectId)}>Like It</button>
                                    <div>
                                        <p>Likes - {geolocation.likes}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Geolocation