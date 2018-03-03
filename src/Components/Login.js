import React from 'react';

const login = (props) => {
  return (<div className='login-container'>
            <div className='login-box'>
              <h1>SUMMIT</h1>
              <h3>LOG-IN</h3>
              <br></br>
              <input value='UserName' className='login-input'></input>
              <input value='Password' className='login-input'></input>
              <button className='login-button'>Submit</button>
            </div>
         </div>);
};

export default login;
