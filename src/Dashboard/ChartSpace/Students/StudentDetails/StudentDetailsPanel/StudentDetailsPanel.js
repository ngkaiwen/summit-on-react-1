import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import StudentProfileDisplay from "./StudentProfileDisplay/StudentProfileDisplay.js";
import AssignmentCompletionStatus from "./AssignmentCompletionStatus/AssignmentCompletionStatus.js";
import StudentCompletionTimePercentile from "./StudentCompletionTimePercentile/StudentCompletionTimePercentile.js";
import SubmissionsOverTime from "./SubmissionsOverTime/SubmissionsOverTime.js";
import AchievementsStatistics from "./StudentCodeCombatCharts/AchievementsStatistics.js";
import TimeBreakDown from "./StudentCodeCombatCharts/TimeBreakDown.js"
import TimePerLevel from "./StudentCodeCombatCharts/TimePerLevel.js"

class StudentDetailsPanel extends Component {


  render() {
    //console.log(this.props.assignmentData)
    if (Object.keys(this.props.selectedStudentData).length === 0){ //Check if there is no selected student
      return( <div className = "student-details-panel-container">
                  <div className = "selectSomething">
                    <h1>PLEASE SELECT A STUDENT</h1>
                  </div>
              </div> )
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

            <Grid item xs = {10}>
                <div className = "third-row-pane-container">
                  <AchievementsStatistics selectedStudentData = {this.props.selectedStudentData}/>
                </div>
            </Grid>

            <Grid item xs = {10}>
                <div className = "fourth-row-pane-container">
                  <TimeBreakDown selectedStudentData = {this.props.selectedStudentData}/>
                </div>
            </Grid>

            <Grid item xs = {10}>
                <div className = "fifth-row-pane-container">
                <TimePerLevel selectedStudentData = {this.props.selectedStudentData}/>
                </div>
            </Grid>

          </Grid>

        </div>
      )
    }
  }
}

export default StudentDetailsPanel;
