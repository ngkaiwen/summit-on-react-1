import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

const toolbar = (props) => {
  return(<div className="toolbar-container">
            <div className="logo">SUMMIT<strong className="logo-subhead">DASHBOARD</strong></div>
            
            <AppBar position="static" fullWidth >
              <Tabs>
                <Tab label = "overview" onClick={() => props.clicked('overview')}/>
                <Tab label = "student" onClick={() => props.clicked('students')}/>
                <Tab label = "students list" onClick={() => props.clicked('studentsList')}/>
                <Tab label = "logout" to="/" />
              </Tabs>
            </AppBar>
        </div>
        )
}

export default toolbar;
