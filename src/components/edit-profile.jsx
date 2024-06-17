import React, {useEffect, useState} from "react";
import Backendless from "backendless";
import '../styles/form-styles.css';
import {useNavigate} from "react-router-dom";

function EditProfile() {

    const [user, setUser] = useState('')
    
    const [age, setAge] = useState('')
    const [sex, setSex] = useState('')
    const [country, setCountry] = useState('')

    const navigate = useNavigate()

    const getUser = async () => {
        try{
            setUser(await Backendless.UserService.getCurrentUser())
        } catch(err) {
            console.error(err)
        }
    }

    const redirectToAccount = () => {
        navigate('/account'); // Redirect to account page
    };

    const editProfile = async () => {
        try {
            await Backendless.Data.of('Users').save({
                objectId: user.objectId,
                age: +age,
                sex,
                country
            })
            alert('Your account data was updated')
            navigate('/account', { replace: true })
        } catch(err) {
            console.log(err)
        }
    }

    useEffect( () => {
        const fetchData = async () => {
            await getUser()
        }

        fetchData()
    })
    return (
        <div>
            <button className="back-button" onClick={redirectToAccount}>Back</button>
        <div className="register-form-container">
            {/* Back Button */}
            

            <div className="form">
                <div className="register-form-group">
                    <label>Age</label>
                    <input
                        type="text"
                        value={age}
                        onChange={event => setAge(event.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label>Sex</label>
                    <input
                        type="text"
                        value={sex}
                        onChange={event => setSex(event.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        value={country}
                        onChange={event => setCountry(event.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <button className="register-btn-submit" onClick={editProfile}>Edit</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default EditProfile;