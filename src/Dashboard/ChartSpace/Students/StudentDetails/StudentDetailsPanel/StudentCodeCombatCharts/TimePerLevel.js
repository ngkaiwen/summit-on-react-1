import React, { Component } from 'react';
import TimePerLevelChart from "./TimePerLevelChart.js"

class TimePerLevel extends Component {
  render(){
    const data = this.props.selectedStudentData["codeCombatDisplayData"]
    if(data == null){return null;}

    const chartData = data["timePerLevel"]
    if(chartData == null){return null;}
    const average = chartData["Average"] //possibly null
    const median = chartData["Median"] //possibly null
    return(
      <div>

        <div className = "pane-title">
          Time Spent Per Code Combat Level in Seconds
        </div>

      </div>);




  }
}

export default TimePerLevel;
