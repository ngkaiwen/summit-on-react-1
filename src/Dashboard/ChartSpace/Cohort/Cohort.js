import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../Misc/Spinner';
import { Tooltip,Legend, Bar, XAxis, YAxis, Line, ComposedChart} from "recharts";

class Cohort extends Component {

  render() {
    const cohortdata = this.props.data;
    console.log(cohortdata);
    //const cohortCharts = cohortdata["timeComparisonChart"];
    return (
      cohortdata ?
      <div className='cohort-main-container'>
          <h1>Cohort Comparison</h1>
          <div className='cohort-grid-container'>

            <div className='cohort-grid-item-blank'>
              <p style={{fontSize:28 ,color:"#020202"}}>  <b> COMPARISONS OF ALL COHORTS</b></p>
            </div>

            <div className='cohort-grid-item'>
              <img src="http://www.investorsinpeople.co.za/wp-content/uploads/2015/09/team-icon.png" width="200" height="200" alt="" />
              <br/>
              <p style={{fontSize:22 ,color:"#f05683"}}>  <b> {cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["name"]}</b></p>
              <br/>
              <p style={{fontSize:20 ,color:"#142b9d"}}>{cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["size"]} Courses</p>
              <p style={{fontSize:14}}> Average Students Per Course: {Math.round(cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["averageSizePerCourse"])}</p>
              <p style={{fontSize:20 ,color:"#142b9d"}}> Instructor: {cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["instructor"]}</p>
            </div>

            <div className='cohort-grid-item'>
              <img src="http://rsmudancas.com.br/images/services/icon-team-1024x1024-150dpi-1.png" width="200" height="200" alt="" />
              <br/>
              <p style={{fontSize:22 ,color:"#f05683"}}>  <b> {cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["name"]}</b></p>
              <br/>
              <p style={{fontSize:20 ,color:"#142b9d"}}>{cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["size"]} Courses</p>
              <p style={{fontSize:14}}> Average Students Per Course: {Math.round(cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["averageSizePerCourse"])}</p>
              <p style={{fontSize:20 ,color:"#142b9d"}}> Instructor: {cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["instructor"]}</p>
            </div>

            <div className='cohort-grid-item'>
              <img src="http://2017.igem.org/wiki/images/b/bd/AQAUnesp-team-icon.png" width="200" height="200" alt="" />
              <br/>
              <p style={{fontSize:22 ,color:"#f05683"}}>  <b> {cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["name"]}</b></p>
              <br/>
              <p style={{fontSize:20 ,color:"#142b9d"}}>{cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["size"]} Courses</p>
              <p style={{fontSize:14}}> Average Students Per Course: {Math.round(cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["averageSizePerCourse"])}</p>
              <p style={{fontSize:20 ,color:"#142b9d"}}> Instructor: {cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["instructor"]}</p>
            </div>

            <div className='cohort-grid-item-joint'>
                <div className="cohort-table-item">
                  <p style={{fontSize:20 ,color:"#142b9d"}}>  <b> COHORT PERFORMANCE AND EFFORT METRICS </b></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:17 ,color: "#07B4B6"}}>  <b> {cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["name"]}</b></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:17 ,color: "#07B4B6"}}>  <b> {cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["name"]}</b></p>
                </div>

                <div className="cohort-table-item">
                    <p style={{fontSize:17 ,color: "#07B4B6"}}>  <b> {cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["name"]}</b></p>
                </div>


                <div className="cohort-table-item">
                  <p style={{fontSize:18}}>  <b> Maximum Levels Completed by >=75% of Cohort</b></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:25}}>  <u><b> {cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["maxLevel75"]}</b></u></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:25}}>  <u><b> {cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["maxLevel75"]}</b></u></p>
                </div>

                <div className="cohort-table-item">
                    <p style={{fontSize:25}}>  <u><b> {cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["maxLevel75"]}</b></u></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:18}}>  <b> Average Time Spent Per Student in Cohort</b></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:22}}>  <u><b> {cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["AverageTime"]} Hours</b></u></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:22}}>  <u><b> {cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["AverageTime"]} Hours</b></u></p>
                </div>

                <div className="cohort-table-item">
                    <p style={{fontSize:22}}>  <u><b> {cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["AverageTime"]} Hours</b></u></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:18}}>  <b> Median Time Spent Per Student in Cohort</b></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:22}}>  <u><b> {cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["MedianTime"]} Hours</b></u></p>
                </div>

                <div className="cohort-table-item">
                  <p style={{fontSize:22}}>  <u><b> {cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["MedianTime"]} Hours</b></u></p>
                </div>

                <div className ="cohort-table-item">
                    <p style={{fontSize:22}}>  <u><b> {cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["MedianTime"]} Hours</b></u></p>
                </div>
            </div>

            <div className='cohort-grid-item-joint1'>
              <div className='cohort-pane-title'>
                <p style={{fontSize:20 ,color: "#FFFFFF"}}>  <b> RELATIVE TIME SPENT FOR EACH CODE COMBAT LEVEL BY STUDENTS</b></p>
              </div>

              <div className = "cohort-pane-content">
                <div className = "cohort-pane-content-sub">
                  <p style={{fontSize:15 ,color: "#020202"}}>
                    <ComposedChart width={700} height={300} data={cohortdata["timeComparisonChart"]}
                      margin={{top: 25, right: 10, left: 10, bottom: 10}}>
                     <XAxis dataKey="Label" tick = {false} padding={{ left: 75, right: 75 }}/>
                     <YAxis/>
                     <Tooltip/>
                     <Legend />
                     <Bar dataKey="Cohort Minimum Time Per Level" stackId="a" fill="#AED581" />
                     <Bar dataKey="Cohort Maximum Time Per Level" stackId="a" fill="#e79db6" />
                     <Line type='monotone' dataKey='Cohort Average Time Per Level' stroke='#07B4B6' />
                     <Line type='monotone' dataKey='Cohort Median Time Per Level' stroke='#f24d05' />
                    </ComposedChart>
                    </p>
                  <p style={{fontSize:17 ,color: "#020202"}}> COHORT COMPARISON OF DISTRIBUTION OF TIME SPENT ON CODE COMBAT LEVELS</p>
                </div>
              </div>
            </div>

          </div>
      </div> : <div style={{marginTop:"50vh"}}><Spinner /></div>
    );
  }
}

function mapStateToProps(state){
  return {
    data: state["cohort_data"]
  };
};

export default connect(mapStateToProps)(Cohort);
