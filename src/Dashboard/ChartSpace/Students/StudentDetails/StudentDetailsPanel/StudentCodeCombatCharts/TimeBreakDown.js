import React, { Component } from 'react';
import TimeBreakDownChart from "./TimeBreakDownChart.js"
import TimeBreakDownComparisonChart from "./TimeBreakDownComparisonChart.js"

class TimeBreakDown extends Component {

  render() {
    //console.log(data);
    const data = this.props.selectedStudentData["codeCombatDisplayData"]

    if(data == null){return null;}

    const pieData = data["timeBreakdown"]
    //console.log(pieData);
    if (pieData == null) { return null ;}

    if(pieData["total"] != null){
      const totalTime = Math.ceil(pieData["total"])
      if(pieData["averageTimeOthers"]!= null && pieData["medianAttempts"]!= null){
        if(pieData["ownChart"]!= null && pieData["comparisonChart"]!= null){
          return(
            <div>

              <div className = "pane-title">
              Breakdown of Time Spent on Code Combat
              </div>

              <div className = "third-row-upper-divider">
                <div className = "third-row-left-sub-pane">
                  <p style={{fontSize:20, color:"#ed466b"}}> {totalTime} minutes</p>
                </div>
                <div className = "third-row-right-sub-pane">
                  <p style={{fontSize:20, color:"#142b9d"}}> {pieData["averageTimeOthers"]} minutes </p>
                </div>
                <div className = "third-row-left-sub-pane">
                  <p style={{fontSize:14}}> spent on Code Combat levels</p>
                </div>
                <div className = "third-row-right-sub-pane">
                  <p style={{fontSize:14}}> spent by other students with the same achievement attainment</p>
                </div>
              </div>

              <div className = "third-row-dual-charts">
                <div className = "third-row-left-sub-pane">
                  <div className = "left-sub-pane">
                    <TimeBreakDownChart pieData = {pieData}/>
            			</div>
            		    <div className = "right-sub-pane">
            				    {Math.round(pieData["ownChart"][0]["Value"]*100)}%
            			  </div>
                  <div className = "third-row-chart-title">
                    <p style={{fontSize:14}}> Efficiency of time spent on Code Combat</p>
                  </div>
                </div>
                <div className = "third-row-right-sub-pane">
                  <div className = "left-sub-pane">
                    <TimeBreakDownComparisonChart pieData = {pieData}/>
                  </div>
                  <div className = "right-sub-pane">
                    {Math.round(pieData["comparisonChart"][0]["Value"]*100)}%
                  </div>
                <div className = "third-row-chart-title">
                  <p style={{fontSize:14}}> Efficiency of time spent by peers with similar standards</p>
                </div>
                </div>
              </div>

              <div className = "third-row-last-stats">
                <div className = "third-row-left-sub-pane">
                  <p style={{fontSize:15}}> Median Attempts Per Level: {pieData["medianAttempts"]}</p>
                </div>
              </div>

            </div>
            );
          }
          else if (pieData["ownChart"]!= null){
            return(
              <div>

                <div className = "pane-title">
                  Breakdown of Time Spent on Code Combat
                </div>

                <div className = "third-row-upper-divider">
                  <div className = "third-row-left-sub-pane">
                    <p style={{fontSize:20, color:"#f05683"}}> {totalTime} minutes</p>
                  </div>
                  <div className = "third-row-right-sub-pane">
                    <p style={{fontSize:20, color: "#142b9d"}}> {pieData["averageTimeOthers"]} minutes </p>
                  </div>
                  <div className = "third-row-left-sub-pane">
                    <p style={{fontSize:14}}> spent on Code Combat levels</p>
                  </div>
                  <div className = "third-row-right-sub-pane">
                    <p style={{fontSize:14}}> spent by other students with the same achievement attainment</p>
                  </div>
                </div>

                <div className = "third-row-dual-charts">
                  <div className = "third-row-left-sub-pane">
                    <div className = "left-sub-pane">
                      <TimeBreakDownChart pieData = {pieData}/>
                    </div>
                    <div className = "right-sub-pane">
                      {Math.round(pieData["ownChart"][0]["Value"]*100)}%
                    </div>
                    <div className = "third-row-chart-title">
                      <p style={{fontSize:14}}> Efficiency of time spent on Code Combat </p>
                    </div>
                  </div>
                </div>

                <div className = "third-row-last-stats">
                  <div className = "third-row-left-sub-pane">
                    <p style={{fontSize:15}}> Median Attempts Per Level: {pieData["medianAttempts"]}</p>
                  </div>
                </div>

              </div>
              );
          }
        }

        if(pieData["ownChart"]!= null && pieData["medianAttempts"]!= null){
        return(
          <div>

            <div className = "pane-title">
              Breakdown of Time Spent on CodeCombat
            </div>

            <div className = "third-row-upper-divider">
              <div className = "third-row-left-sub-pane">
                <p style={{fontSize:20, color:"#f05683"}}> {totalTime} minutes</p>
                <p style={{fontSize:16}}> spent on CodeCombat</p>
              </div>
              <div className = "third-row-right-sub-pane">
                <p style={{fontSize:17}}> No information on other users with the same number of levels recorded</p>
              </div>
            </div>

            <div className = "third-row-dual-charts">
              <div className = "third-row-left-sub-pane">
                <TimeBreakDownChart pieData = {pieData}/>
              </div>
              <div className = "right-sub-pane">
                {Math.round(pieData["ownChart"][0]["Value"]*100)}%
              </div>
              <div className = "third-row-chart-title">
                <p style={{fontSize:14}}> Efficiency of time spent on Code Combat </p>
              </div>
              <div className = "third-row-right-sub-pane">
                <div className = "third-row-chart-title">
                  <p style={{fontSize:14}}> No other recorded users who completed the same number of levels</p>
                </div>
              </div>
            </div>

            <div className = "third-row-last-stats">
              <div className = "third-row-left-sub-pane">
                <p style={{fontSize:16}}> Median Attempts Per Level: {pieData["medianAttempts"]}</p>
              </div>
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

            <div className = "third-row-upper-divider">
              <div className = "third-row-left-sub-pane">
                <p style={{fontSize:17}}> No CodeCombat play time is recorded </p>
              </div>
              <div className = "third-row-right-sub-pane">
                <p style={{fontSize:17, color: "#142b9d"}}> Average time spent by other students with the same achievements: {pieData["averageTimeOthers"]} minutes </p>
              </div>
            </div>

            <div className = "third-row-dual-charts">
              <div className = "third-row-left-sub-pane">
                <div className = "left-sub-pane">
                  <TimeBreakDownChart pieData = {pieData}/>
                </div>
                <div className = "right-sub-pane">
                  {Math.round(pieData["ownChart"][0]["Value"]*100)}%
                </div>
                <div className = "third-row-chart-title">
                  <p style={{fontSize:14}}> Efficiency of time spent on Code Combat</p>
                </div>
              </div>
              <div className = "third-row-right-sub-pane">
                <div className = "left-sub-pane">
                  <TimeBreakDownComparisonChart pieData = {pieData}/>
                </div>
                <div className = "right-sub-pane">
                  {Math.round(pieData["comparisonChart"][0]["Value"]*100)}%
                </div>
                <div className = "third-row-chart-title">
                  <p style={{fontSize:14}}> Efficiency of time spent by peers with similar standards</p>
                </div>
              </div>
            </div>
            
          </div>
        );
      }

      else {return null;}


  }
}

export default TimeBreakDown;
