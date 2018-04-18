import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Toolbar from './Toolbar';
import ToolbarAdmin from './ToolbarAdmin';
import ChartSpace from './ChartSpace/ChartSpace';
import CourseSelectionDialog from "./CourseSelectionDialog/CourseSelectionDialog"
import RefreshDataDialog from "./RefreshDataDialog/RefreshDataDialog"
import Button from 'material-ui/Button';
import {Settings} from 'material-ui-icons';
import {Autorenew} from 'material-ui-icons';
import Tooltip from 'material-ui/Tooltip';



class dashboard extends Component {

  state = {
    displayPage: 'overview',
    displayCourseSelectionDialog: false,
    displayDataRefreshDialog: false
  }

  toolbarClickHandler = (pageID) => {
    this.setState({displayPage: pageID})
  }

  dialogDisplayToggle = (dialogName) => {
    if (dialogName =="courseSelection"){
      var bool = (this.state.displayCourseSelectionDialog) ? false : true
      this.setState({displayCourseSelectionDialog:bool})
    }
    else if (dialogName == "dataRefresh"){
      var bool = (this.state.displayDataRefreshDialog) ? false : true
      this.setState({displayDataRefreshDialog:bool})
    }
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

          <RefreshDataDialog
            open = {this.state.displayDataRefreshDialog}
            dialogDisplayToggle = {() => this.dialogDisplayToggle("dataRefresh")}/>

          <CourseSelectionDialog 
            open = {this.state.displayCourseSelectionDialog}
            dialogDisplayToggle = {() => this.dialogDisplayToggle("courseSelection")}/>
          
          <ChartSpace type={this.state.displayPage}/>

          <div className="DialogShowButtons">
            
            <div className = "dataRefresh">
              <Tooltip id="tooltip" title="Data refresh" placement = "left">
                <Button 
                  variant="fab" 
                 
                  onClick = {() => this.dialogDisplayToggle("dataRefresh")}
                  children = {<Autorenew/>} />
              </Tooltip>
            </div>

            <Tooltip id="tooltip" title="Course selection" placement = "left">
              <Button 
                variant="fab" 
               
                onClick = {() => this.dialogDisplayToggle("courseSelection")}
                children = {<Settings/>} />
            </Tooltip>
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
