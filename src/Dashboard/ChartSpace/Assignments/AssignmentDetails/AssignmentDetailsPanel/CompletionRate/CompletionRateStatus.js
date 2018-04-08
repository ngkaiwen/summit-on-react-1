import React, { Component } from 'react';
import CompletionRatePieChart from "./CompletionRatePieChart.js"

class CompletionRateStatus extends Component {

  render() {
    const pieData2 = this.props.selectedAssignmentData["displayData"]["pie"]

    if ( Object.keys(pieData2).length === 0){ return null } //Check whether an assignment has been selected in assignment list - do not render anything if nothing has been selected

  else {
    const completed = pieData2["data"][0]["Value"]
  	const notCompleted = pieData2["data"][1]["Value"]
  	const total = completed + notCompleted
  	const percentage = Math.round(completed*100/total)
    return (
      <div className="assignments-title">
			<h4>
				Assignment submission rate
			</h4>
			<div className = "left-sub-pane">
  				<CompletionRatePieChart pieData2 = {pieData2}/>
  			</div>
  			<div className = "right-sub-pane">
  				{percentage}%
  			</div>
  		</div>
  	);
  }
}
}

export default CompletionRateStatus;
