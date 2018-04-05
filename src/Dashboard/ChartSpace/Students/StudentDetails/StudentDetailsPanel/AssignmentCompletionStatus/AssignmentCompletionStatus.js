import React, { Component } from 'react';
import AssignmentCompletionPieChart from "./AssignmentCompletionPieChart.js"

class AssignmentCompletionStatus extends Component {

  render() {
  	const pieData = this.props.selectedStudentData["displayData"]["pie"]
  	const completed = pieData["data"][0]["Value"]
  	const notCompleted = pieData["data"][1]["Value"]
  	const total = completed + notCompleted
  	const percentage = Math.round(completed*100/total)

  	return (
  		<div>
			<div className = "pane-title">
				Assignment submission status
			</div>
			<div className = "left-sub-pane">
  				<AssignmentCompletionPieChart pieData = {pieData}/>
  			</div>
  			<div className = "right-sub-pane">
  				{percentage}%
  			</div>
  		</div>
  	);
  }
}

export default AssignmentCompletionStatus;
