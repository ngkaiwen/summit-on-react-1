import React, { Component } from 'react';
import StudentCompletionTimeChart from "./StudentCompletionTimeChart.js"

class StudentCompletionTime extends Component {

  render() {
  	return ( 
  		<div>
  			<div className = "pane-title">
  				Completion time percentile per assignment
  			</div>
  			<div className = "left-sub-pane">
  				<StudentCompletionTimeChart/>
  			</div>
  		</div>
  	);
  }
}

export default StudentCompletionTime;