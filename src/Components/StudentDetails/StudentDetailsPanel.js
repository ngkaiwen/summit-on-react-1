import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import "./StudentDetails.css";
import StudentProfileDisplay from "./StudentProfileDisplay.js";
import StudentAssignmentsCompleted from "./StudentAssignmentsCompleted.js";

class StudentDetailsPanel extends Component {


  render() {
    const numberOfAssignments = Object.keys(this.props.assignmentData).length
    return (
      <div className = "student-details-panel-container">
        <Grid container justify="center">  
          <Grid item xs = {10}> <StudentProfileDisplay selectedStudentData = {this.props.selectedStudentData}/> </Grid>
          
          <Grid item xs = {10}> 
            <StudentAssignmentsCompleted 
              selectedStudentData = {this.props.selectedStudentData}
              numberOfAssignments = {numberOfAssignments}/>
          </Grid>
          
          <Grid item className="student-time-joined-display" xs = {10}> <Paper> Time since joining course </Paper> </Grid>
          
          <Grid item className="student-time-spent" xs = {10}> <Paper> Time spent on assignments </Paper> </Grid>
          
          <Grid item className="student-list-of-assignments-and-completion" xs = {10}> <Paper> List of assignments and completion</Paper> </Grid>
        </Grid>

      </div>
    )
  }
}

export default StudentDetailsPanel;
