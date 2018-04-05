import React, { Component } from 'react';
import StudentCompletionTimePercentileChart from "./TimePercentileChart.js"

class StudentCompletionTimePercentile extends Component {

  render() {
    const chartData = this.props.selectedStudentData["displayData"]["assignmentPercentiles"]

  	return (
  		<div>
  			<div className = "pane-title">
  				Completion time percentile per assignment
  			</div>

  			<div className = "left-sub-pane">
  				<StudentCompletionTimePercentileChart chartData = {chartData}/>
  			</div>

        <div className = "right-sub-pane-second-row">
          <p style={{fontSize:12}}> Average percentile </p>
          {chartData["average"]}%
        </div>
  		</div>
  	);
  }
}

export default StudentCompletionTimePercentile;
