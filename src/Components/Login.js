import React from 'react';
import { Link } from 'react-router-dom';

const login = (props) => {
  return (<div className='login-container'>
            <div className='login-box'>
              <h1>SUMMIT</h1>
              <h3>LOG-IN</h3>
              <br></br>
              <input value='UserName' className='login-input'></input>
              <input value='Password' className='login-input'></input>
              <Link to='/dashboard'><button className='login-button'>Submit</button></Link>
            </div>
         </div>);
};

export default login;
