import React, { Component } from 'react';
import { createStore } from 'redux';
import MainAppReducer from "../Redux/AppReducer.js";
import { Provider, connect } from 'react-redux';
import {firebaseHandle} from "../Config/firebaseAPI.js";
import { Link, Redirect } from 'react-router-dom';

import Toolbar from './Toolbar';
import ToolbarAdmin from './ToolbarAdmin';
import ChartSpace from './ChartSpace/ChartSpace';
import CourseSelectionDialog from "./CourseSelectionDialog/CourseSelectionDialog"
import Button from 'material-ui/Button';
import {Settings} from 'material-ui-icons';




class dashboard extends Component {

  state = {
    displayPage: 'overview',
    displayCourseSelectionDialog: false
  }

  toolbarClickHandler = (pageID) => {
    this.setState({displayPage: pageID})
  }

  dialogDisplayToggle = () => {
    var bool = (this.state.displayCourseSelectionDialog) ? false : true
    this.setState({displayCourseSelectionDialog:bool})
  }

  signOut = () => {
    this.props.logOut();
  }


  render() {
    return (
      this.props.auth ?  
        <div className='dashboard'>
          
          <div className='toolbar'> 
            {this.props.role === 'EDUCATOR' ? <Toolbar role={this.props.role} clicked={this.toolbarClickHandler} cur={this.state.displayPage} out={this.signOut}/> : null}
            {this.props.role === 'ADMINISTRATOR' ? <ToolbarAdmin role={this.props.role} clicked={this.toolbarClickHandler} cur={this.state.displayPage} out={this.signOut}/> : null}
          </div>

          <CourseSelectionDialog 
            open = {this.state.displayCourseSelectionDialog}
            dialogDisplayToggle = {this.dialogDisplayToggle}/>
          
          <ChartSpace type={this.state.displayPage}/>

          <div className="courseSelectionDialogShow">
          <Button 
            variant="fab" 
           
            onClick = {this.dialogDisplayToggle}
            children = {<Settings/>} />
          </div>
        </div>
      : <Redirect to="/"/>

     
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state["auth"],
    user: state.user,
    role: state.role
  } 
}

export default connect(mapStateToProps)(dashboard);
