import React from 'react';
import { Link } from 'react-router-dom';

const toolbar = (props) => {
  return(<div className="toolbar-container">
            <div className="logo">SUMMIT<strong className="logo-subhead">DASHBOARD</strong></div>
            <nav className="toolbar-nav-box">
              <ul>
                <li onClick={() => props.clicked('overview')}>overview</li>
                <li onClick={() => props.clicked('students')}>student</li>
                <li onClick={() => props.clicked('studentsList')}>Students List</li>
                <li>predictions</li>
                <li><Link to='/'>log-out</Link></li>
              </ul>
            </nav>
        </div>)
}

export default toolbar;
