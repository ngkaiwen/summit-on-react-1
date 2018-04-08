import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
//import Paper from 'material-ui/Paper';
import BasicInformation from "./BasicInformation/BasicInformation.js";
import CompletionRateStatus from "./CompletionRate/CompletionRateStatus.js";
import StudentsCompleted from "./StudentsCompleted/StudentsCompleted.js";
import StudentsNotCompleted from "./StudentsNotCompleted/StudentsNotCompleted.js";
import CompletionLists from "./StudentsCompletedLists/CompletionLists.js";
import SubmissionsRateChart from "./SubmissionsRate/SubmissionsRateChart.js";

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

                <div className = "assign-second-row-pane-left">
                <CompletionRateStatus
                selectedAssignmentData = {this.props.selectedAssignmentData}/>
                </div>

                <div className = "assign-second-row-pane-right">
                <CompletionLists
                selectedAssignmentData = {this.props.selectedAssignmentData}/>
                </div>
              </div>
              </Grid>

              <Grid item xs = {10}>
                <div className = "Overview-CC-grid-item">
                <SubmissionsRateChart
                selectedData = {this.props.selectedAssignmentData['Charts']['StudentsByTime']}
                  assignmentClickHandler = {this.assignmentClickHandler}/>
              </div>
              </Grid>


          </Grid>

        </div>
      )}
}
}

export default AssignmentDetailsPanel;
