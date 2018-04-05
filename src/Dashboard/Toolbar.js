import React from 'react';
import { Link } from 'react-router-dom';

const toolbar = (props) => {
  return(<div className="toolbar-container">
            <div className="logo">SUMMIT<strong className="logo-subhead">DASHBOARD</strong></div>
            <nav className="toolbar-nav-box">
              <ul>
                <li onClick={() => props.clicked('overview')} className={props.cur==='overview' ? "active" : null}>Overview</li>
                <li onClick={() => props.clicked('studentsList')} className={props.cur==='studentsList' ? "active" : null}>Students List</li>
                <li onClick={() => props.clicked('assignmentsList')} className={props.cur==='assignmentsList' ? "active" : null}>Assignments List</li>
                <li><Link to='/'>log-out</Link></li>
              </ul>
            </nav>
        </div>)
}

export default toolbar;
