import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css';
import {AuthContext} from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const hadnleRegister = () => {
    navigate('/register');
  }
  const {user} = useContext(AuthContext);
  return (
    <div className="navbar">
        <div className="navContainer">
            <Link to="/" className="navLink">
              <span className="logo">bagobooking</span>
            </Link>
            {
              user ? user.username : 
              <div className="navItems">
                  <button className="navButton"  onClick={hadnleRegister}>Register</button>
                  <button className="navButton" onClick={handleLogin}>Login</button>
              </div>
            }
        </div>
    </div>
  )
}

export default Navbar