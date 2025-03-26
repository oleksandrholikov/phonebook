import './contact.css';
import React from 'react';
// import { useState } from 'react';


function Contact (props) {  
  const { user } = props;
  
  return (  
    <div className="cart ">        
      
        <span className='cart_info'>Name: {user.firstName} {user.lastName}</span>
        <span className='cart_info'>Phone: {user.phone}</span>
        <span className='cart_info'>Gender: { user.gender}</span>
        
    </div>)
}

export default Contact;
