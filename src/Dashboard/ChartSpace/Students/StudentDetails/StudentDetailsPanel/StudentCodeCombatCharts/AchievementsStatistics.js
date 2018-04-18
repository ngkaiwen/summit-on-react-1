import React, { Component } from 'react';
class AchievementsStatistics extends Component {

  render() {

    const data = this.props.selectedStudentData["codeCombatDisplayData"]

    if (data == null) {return null}

    const chartData = this.props.selectedStudentData["codeCombatDisplayData"]["courseRankingChart"]

    if(chartData == null){return null}

    const percentileRoundUp = Math.ceil(chartData["Course Percentile"])

    if(chartData["Maximum Attained Level"]===0){
      return(
        <div>
        <div className = "pane-title">
        RANKING BASED ON CODE COMBAT ACHIEVEMENTS
        </div>

        <div className = "third-row-left-sub-pane">
        <p style={{fontSize:20, color:"#f05683"}}> <b> {chartData["Course Rank"]}</b> th</p>
        <p style={{fontSize:14}}> in Course</p>
        </div>

        <div className = "third-row-right-sub-pane">
        <p style={{fontSize:14}}> No record of any Code Combat data found! </p>
        </div>
        </div>
      );
    }

    else{
    return (
      <div>
      <div className = "pane-title">
      RANKING BASED ON CODE COMBAT ACHIEVEMENTS
      </div>

      <div className = "third-row-left-sub-pane">
      <p style={{fontSize:20, color:"#f05683"}}> <b> {chartData["Course Rank"]}</b> th</p>
      <p style={{fontSize:14}}> in Course</p>
      </div>

      <div className = "third-row-right-sub-pane">
      <p style={{fontSize:17}}> {chartData["Maximum Attained Level"]} Levels completed </p>
      <p style={{fontSize:17, color: "#142b9d"}}> <b> {percentileRoundUp}% </b> Percentile in Performance </p>
      </div>
      </div>
    );
  }
  }
}

export default AchievementsStatistics;
