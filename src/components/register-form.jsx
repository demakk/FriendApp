import React, { useState } from "react";
import Backendless from "backendless";
import '../styles/form-styles.css';
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [isHide, setIsHide] = useState(true);
    const currType = 'password';

    const navigate = useNavigate();

    const registerUser = async () => {
        try {
            localStorage.clear();
            let user = new Backendless.User();
            user.name = name;
            user.email = email;
            user.age = age.toString();
            user.sex = sex;
            user.country = country;
            user.password = password;
            const use = Backendless.UserService.register(user);
            
            alert(`A confirmation message has been sent to ${user.email}`);
            Backendless.Files.createDirectory(`/${user.name}/Shared-folder`)
            setName('');
            setEmail('');
            setAge('');
            setSex('');
            setCountry('');
            setPassword('');
            
            navigate('/login', { replace: true });  
        } catch (err) {
            console.log(err);
        }
    };

    // Function to make API call to create folders for the user on the backend server
// const createFoldersForUser = async (userName) => {

//         // Create user's directory
//         await Backendless.Files.createDirectory(`/dmtro_nure123/${userName}`);
        
// };

    return (
        <div className="register-form-container">
            <h2>Register</h2>
            <form className="register-form">
                <div className="register-form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label>Age</label>
                    <input 
                        type="number" 
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
                    <label>Password</label>
                    <input 
                        type={isHide ? currType : 'text'} 
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <div className="register-show-password">
                        <div>Show Password</div>
                        <label>
                            <input 
                                type="checkbox" 
                                onChange={event => setIsHide(event.target.checked)} 
                            />
                        </label>
                    </div>
                </div>
                <button className="register-btn-submit" type="button" onClick={registerUser}>Register</button>
            </form>
        </div>
    );
}

export default Register;