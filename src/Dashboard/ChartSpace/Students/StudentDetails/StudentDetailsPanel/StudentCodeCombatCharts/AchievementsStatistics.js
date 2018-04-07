import React, { Component } from 'react';
class AchievementsStatistics extends Component {

  render() {

    const data = this.props.selectedStudentData["codeCombatDisplayData"]

    if (data == null) {return null}
 
    const chartData = this.props.selectedStudentData["codeCombatDisplayData"]["courseRankingChart"]

    if(chartData == null){return null}

    const percentileRoundUp = Math.ceil(chartData["Course Percentile"])

    if(chartData["Maximum Attained Level"]==0){
      return(
        <div>
        <div className = "pane-title">
        Relative Ranking Based on CodeCombat Achievements
        </div>

        <div className = "third-row-left-sub-pane">
        <p style={{fontSize:20}}> {chartData["Course Rank"]}th in Course </p>
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
      Relative Ranking Based on CodeCombat Achievements
      </div>

      <div className = "third-row-left-sub-pane">
      <p style={{fontSize:24}}> {chartData["Course Rank"]}th in Course </p>
      </div>

      <div className = "third-row-right-sub-pane">
      <p style={{fontSize:18}}> Completed {chartData["Maximum Attained Level"]} levels </p>
      <p style={{fontSize:18}}> {percentileRoundUp}%  Percentile in Performance </p>
      </div>
      </div>
    );
  }
  }
}

export default AchievementsStatistics;
