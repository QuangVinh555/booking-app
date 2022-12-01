import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Login.scss';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.id]: e.target.value});
    }

    const {login, user, loading, error} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = async() => {
        await login(credentials);
    }
    useEffect(() => {
        if(user) {
            navigate('/');
        }
    })

    return (
        <div className="login">
            <div className="lContainer">
                <input 
                    type="text" 
                    className="lInput" 
                    placeholder="username" 
                    id="username" 
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    className="lInput" 
                    placeholder="password" 
                    id="password" 
                    onChange={handleChange}
                />
                <button disabled={loading} className="lButton" onClick={handleLogin}>Login</button>
                {error && <div style={{color: 'red'}}>username hoặc password không đúng</div>}
            </div>
        </div>
    )
}

export default Login