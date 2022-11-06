import React from 'react';
import './MailList.css';

const MailList = () => {
  return (
    <div className="mailList">
        <h1>Save time, save money!</h1>
        <h4>Sign up and we'll send the best deals to you</h4>
        <div className="mailForm">
            <input type="text" placeholder="Your Email"/>
            <button>Subcribe</button>
        </div>
    </div>
  )
}

export default MailList