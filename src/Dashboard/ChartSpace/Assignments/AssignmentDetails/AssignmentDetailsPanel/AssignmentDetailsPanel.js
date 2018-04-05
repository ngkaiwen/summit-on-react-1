import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import BasicInformation from "./BasicInformation/BasicInformation.js";
import CompletionRateStatus from "./CompletionRate/CompletionRateStatus.js";
import StudentsCompleted from "./StudentsCompleted/StudentsCompleted.js";
import StudentsNotCompleted from "./StudentsNotCompleted/StudentsNotCompleted.js";

class AssignmentDetailsPanel extends Component {


  render() {
    //console.log(this.props.assignmentData)
    if (Object.keys(this.props.selectedAssignmentData).length === 0){ //Check if there is no selected Assignment
      return( <div className = "empty">
        PLEASE SELECT AN ASSIGNMENT </div> )
    }
    else{
      return (

        <div className = "assignment-details-panel-container">
          <Grid container justify="center">
            <Grid item xs = {10}>
            <div className = "assign-first-row-pane-container">
            <BasicInformation selectedAssignmentData = {this.props.selectedAssignmentData}/>
                </div>
            </Grid>

              <Grid item xs = {10}>
                <div className = "assign-second-row-pane-container">
                <CompletionRateStatus selectedAssignmentData = {this.props.selectedAssignmentData}/>
              </div>
              </Grid>

              <Grid item xs = {10}>
                <div className = "assign-third-row-pane-container">
                <StudentsCompleted
                selectedAssignmentData = {this.props.selectedAssignmentData}
                  assignmentClickHandler = {this.assignmentClickHandler}/>

              <StudentsNotCompleted
              selectedAssignmentData = {this.props.selectedAssignmentData}
                assignmentClickHandler = {this.assignmentClickHandler}/>
              />
              </div>
              </Grid>


          </Grid>

        </div>
      )
    }
  }
}

export default AssignmentDetailsPanel;
