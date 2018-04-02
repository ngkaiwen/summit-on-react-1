import React, { Component } from 'react';
import SubmissionsOverTimeChart from "./SubmissionsOverTimeChart.js"

class SubmissionsOverTime extends Component {

  render() {
    //console.log(this.props.selectedStudentData)
  	const chartData = this.props.selectedStudentData["displayData"]["submissionsVStime"]

  	return ( 
  		<div>
  			<div className = "pane-title">
  				Submissions over time 
  			</div>
  			<div className = "central-sub-pane">  			
  				<SubmissionsOverTimeChart chartData = {chartData}/>
  			</div>
  		</div>
  	);
  }
}

export default SubmissionsOverTime;