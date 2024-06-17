import React, { useState } from "react";
import Backendless from "backendless";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/form-styles.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 

    const logIn = async (e) => {
        e.preventDefault();
        try {
            const res = await Backendless.UserService.login(email, password, true); 
            
            navigate('/account', { replace: true });
        } catch (err) {
            console.error(err);
            alert(`Login failed: ${err.message}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={logIn}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <div className="form-options">
                        <div>Show password</div>
                        <label className="show-password">
                            <input 
                                type="checkbox" 
                                checked={showPassword} 
                                onChange={() => setShowPassword(!showPassword)} 
                            />
                        </label>

                    </div>
                </div>
                <button className="btn-submit" type="submit">Log In</button>
                <div className="form-options">
                    <Link to="/register" className="form-link">Register</Link>
                    <Link to="/restore-pass" className="form-link">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;