import React, { Component } from 'react';
import TimeBreakDownChart from "./TimeBreakDownChart.js"
import TimeBreakDownComparisonChart from "./TimeBreakDownComparisonChart.js"

class TimeBreakDown extends Component {

  render() {
    const pieData = this.props.selectedStudentData["codeCombatDisplayData"]["timeBreakdown"]
    if (pieData == null) { return null }

    if(pieData["total"] != null){
      const totalTime = Math.ceil(pieData["total"])
      if(pieData["averageTimeOthers"]!= null && pieData["medianAttempts"]!= null){
          return(
            <div>
              <div className = "pane-title">
              Breakdown of Time Spent on CodeCombat
              </div>

              <div className = "third-row-left-sub-pane">
              <p style={{fontSize:24}}> Spent {totalTime} minutes on CodeCombat </p>
              </div>

              <div className = "third-row-right-sub-pane">
              <p style={{fontSize:20}}> Average time spent by other students with the same achievements: {pieData["averageTimeOthers"]} minutes </p>
              </div>

              <div className = "third-row-left-sub-pane">
              <TimeBreakDownChart pieData = {pieData}/>
                <p style={{fontSize:14}}> Breakdown of time spent on level attempts </p>
              </div>

              <div className = "third-row-right-sub-pane">
              <TimeBreakDownComparisonChart pieData = {pieData}/>
              <p style={{fontSize:14}}> Comparison with users who completed the same number of levels</p>
              </div>

              <div className = "third-row-left-sub-pane">
              <p style={{fontSize:16}}> Median Attempts Per Level: {pieData["medianAttempts"]}</p>
              </div>
            </div>
            );
        }
      }
      else if(pieData["total"] == null && pieData["averageTimeOthers"]!= null){
        return(
          <div>
            <div className = "pane-title">
            Breakdown of Time Spent on CodeCombat
            </div>

            <div className = "third-row-left-sub-pane">
            <p style={{fontSize:20}}> No CodeCombat play time is recorded</p>
            </div>

            <div className = "third-row-right-sub-pane">
            <p style={{fontSize:17}}> Average time spent by other students with the same achievements: {pieData["averageTimeOthers"]} minutes </p>
            </div>

            <div className = "third-row-left-sub-pane">
            <TimeBreakDownChart pieData = {pieData}/>
              <p style={{fontSize:13}}> Breakdown of time spent on level attempts </p>
            </div>

            <div className = "third-row-right-sub-pane">
            <TimeBreakDownComparisonChart pieData = {pieData}/>
            <p style={{fontSize:13}}> Comparison with users who completed the same number of levels</p>
            </div>

          </div>
        );
      }

      else {return null;}


  }
}

export default TimeBreakDown;
