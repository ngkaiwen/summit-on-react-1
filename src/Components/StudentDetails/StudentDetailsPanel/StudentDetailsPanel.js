import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import StudentProfileDisplay from "./StudentProfileDisplay/StudentProfileDisplay.js";
import AssignmentCompletionStatus from "./AssignmentCompletionStatus/AssignmentCompletionStatus.js";
import StudentCompletionTimePercentile from "./StudentCompletionTimePercentile/StudentCompletionTimePercentile.js";
import SubmissionsOverTime from "./SubmissionsOverTime/SubmissionsOverTime.js";

class StudentDetailsPanel extends Component {


  render() {
    //console.log(this.props.assignmentData)
    if (Object.keys(this.props.selectedStudentData).length === 0){ //Check if there is no selected student
      return( <div className = "empty"> 
        Select a student </div> )
    }
    else{
      return (
        <div className = "student-details-panel-container">
          <Grid container justify="center">  
            <Grid item xs = {10}> 
              <StudentProfileDisplay selectedStudentData = {this.props.selectedStudentData}/> 
            </Grid>
            
            <Grid item xs = {5}>
                <div className = "first-row-pane-container">
                  <SubmissionsOverTime selectedStudentData = {this.props.selectedStudentData}/>
                </div>
            </Grid>

            <Grid item xs = {5}>
                <div className = "first-row-pane-container">
                  <AssignmentCompletionStatus selectedStudentData = {this.props.selectedStudentData}/>
                </div>
            </Grid>
            
            <Grid item xs = {10}>
              <div className = "second-row-pane-container">
                <StudentCompletionTimePercentile selectedStudentData = {this.props.selectedStudentData}/>
              </div>
            </Grid>

          </Grid>

        </div>
      )
    }
  }
}

export default StudentDetailsPanel;
