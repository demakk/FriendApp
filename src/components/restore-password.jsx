import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/form-styles.css';
import '../styles/account-styles.css';
import Backendless from "backendless";

function RestorePassword() {

    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const send = async () => {
        try{    
            await Backendless.UserService.restorePassword(email)
            alert(`Your new password was sent to ${email}`)
            navigate('/login', { replace: true })
        } catch(err) {
            console.error(err)
        }
    }

    return(
        <div className="form-container">
            <div className="">
                <div className="register-form-group">
                    <label>Email</label>
                    <input 
                        type="text" 
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div className="submit">
                    <button className="btn" onClick={send}>Send</button>
                </div>
                
            </div>
        </div>
    )
}

export default RestorePassword;