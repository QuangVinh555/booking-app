import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Register.css';

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })
    const [confirmPassword, setConfirmPassword] = useState(""); 
    console.log(credentials);
    console.log(confirmPassword);
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.id]: e.target.value});
    }

    const navigate = useNavigate();
    const {register} = useContext(AuthContext);
    const hadnleRegister = async() => {
        if(credentials.password !== confirmPassword) {
            alert("Mật khẩu không trùng khớp");
        }
        else{
            await register(credentials);
            alert("Đăng ký thành công");
            navigate('/login')
        }
    }
  return (
    <div className="register">
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
            <input
                type="password" 
                className="lInput" 
                placeholder="confirm password" 
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="lButton" onClick={hadnleRegister}>Register</button>
        </div>
    </div>
  )
}

export default Register