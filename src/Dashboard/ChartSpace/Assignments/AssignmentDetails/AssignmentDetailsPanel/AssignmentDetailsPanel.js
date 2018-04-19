import React, { Component } from 'react';
//import Paper from 'material-ui/Paper';
import BasicInformation from "./BasicInformation/BasicInformation.js";
import CompletionRateStatus from "./CompletionRate/CompletionRateStatus.js";
//import StudentsCompleted from "./StudentsCompleted/StudentsCompleted.js";
//import StudentsNotCompleted from "./StudentsNotCompleted/StudentsNotCompleted.js";
import CompletionLists from "./StudentsCompletedLists/CompletionLists.js";
import SubmissionsRateChart from "./SubmissionsRate/SubmissionsRateChart.js";
import YoutubeChart from "./YoutubeChart/YoutubeChart.js";

class AssignmentDetailsPanel extends Component {


  render() {
    //console.log(this.props.assignmentData)
    if (Object.keys(this.props.selectedAssignmentData).length === 0){ //Check if there is no selected Assignment
      return( <div className = "student-details-panel-container">
                  <div className = "selectSomething">
                    <h1>PLEASE SELECT AN ASSIGNMENT</h1>
                  </div>
              </div> )
    }
    else{
      return (
        <div className = "student-details-panel-container">
        <div className = "assignmentDetailsContainer">
          <div className = "assignmentBasicInfo">
            <BasicInformation selectedAssignmentData = {this.props.selectedAssignmentData}/>
          </div>

          <div className = "assignmentPie">
            <CompletionRateStatus selectedAssignmentData = {this.props.selectedAssignmentData}/>
          </div>

          <div className = "assignmentList">
            <CompletionLists selectedAssignmentData = {this.props.selectedAssignmentData}/>
          </div>

          {this.props.selectedAssignmentData['Charts']['StudentsByTime'] ? <div className="assignmentRate">
          <SubmissionsRateChart
            selectedData = {this.props.selectedAssignmentData['Charts']['StudentsByTime']}
            assignmentClickHandler = {this.assignmentClickHandler}/>
          </div> : null }

          {this.props.selectedAssignmentData['Charts']['YoutubeCharts'] ? <div className="assignmentRate">
          <YoutubeChart
            selectedData = {this.props.selectedAssignmentData['Charts']['YoutubeCharts']}/>
          </div> : null }

        </div>
        </div>
      )}
}
}

export default AssignmentDetailsPanel;
