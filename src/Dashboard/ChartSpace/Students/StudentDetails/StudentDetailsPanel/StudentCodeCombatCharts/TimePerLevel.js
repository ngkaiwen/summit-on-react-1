import React, { Component } from 'react';
import TimePerLevelChart from "./TimePerLevelChart.js"

class TimePerLevel extends Component {
  render(){
    const data = this.props.selectedStudentData["codeCombatDisplayData"]
    if(data == null){return null;}

    const chartData = data["timePerLevel"]
    if(chartData == null){return null;}
    const average = Math.round(chartData["Average"]) //possibly null
    const median = Math.round(chartData["Median"]) //possibly null

    if(chartData["data"]!=null && (average==null && median == null))
      {return(
        <div>

          <div className = "pane-title">
            RELATIVE TIME SPENT PER CODE COMBAT LEVEL
          </div>

          <div className = "barChart-left-sub-pane">
            <TimePerLevelChart chartData = {chartData["data"]}/>
            <div className = "third-row-chart-title">
              <p style={{fontSize:14}}> Time spent per level in seconds versus minimum and maximum</p>
            </div>
          </div>

        </div>);}

    else if (chartData["data"]!=null && (average==null && median!=null)){
      return (
        <div>

          <div className = "pane-title">
            RELATIVE TIME SPENT PER CODE COMBAT LEVEL
          </div>

          <div className = "barChart-left-sub-pane">
            <TimePerLevelChart chartData = {chartData["data"]}/>
            <div className = "third-row-chart-title">
              <p style={{fontSize:14}}> Time spent per level in seconds versus minimum and maximum</p>
            </div>
          </div>

          <div className = "barChart-right-sub-pane">
            <p style={{fontSize:15}}> Median Time Per Level:</p>
            <p style={{color:"#142b9d"}}> {median} seconds</p>
          </div>
        </div>);
    }

    else if (chartData["data"]!=null && (average!=null && median==null)){
      return (
        <div>

          <div className = "pane-title">
            RELATIVE TIME SPENT PER CODE COMBAT LEVEL
          </div>

          <div className = "barChart-left-sub-pane">
            <TimePerLevelChart chartData = {chartData["data"]}/>
            <div className = "third-row-chart-title">
              <p style={{fontSize:14}}> Time spent per level in seconds versus minimum and maximum</p>
            </div>
            <p style={{fontSize:15}}> Average Time Per Level:</p>
            <p style={{color:"#ed466b"}}> {average} seconds</p>
          </div>
        </div>);
    }

    else{
      return (
        <div>

          <div className = "pane-title">
            RELATIVE TIME SPENT PER CODE COMBAT LEVEL
          </div>

          <div className = "barChart-left-sub-pane">
            <TimePerLevelChart chartData = {chartData["data"]}/>
            <div className = "third-row-chart-title">
              <p style={{fontSize:14}}> Time spent per level in seconds versus minimum and maximum</p>
            </div>
          </div>

          <div className = "barChart-right-sub-pane">
            <p style={{fontSize:15}}> Average Time Per Level:</p>
            <p style={{color:"#ed466b"}}> {average} seconds</p>
            <p style={{fontSize:15}}> Median Time Per Level:</p>
            <p style={{color:"#142b9d"}}> {median} seconds</p>
          </div>
        </div>);
    }

  }
}

export default TimePerLevel;
