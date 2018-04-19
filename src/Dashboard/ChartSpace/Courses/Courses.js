import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../Misc/Spinner';
import BarChartTimePerLevel from './Charts/BarChartTimePerLevel'
import BarChartTimePerStudent from './Charts/BarChartTimePerStudent'
import BarChartLevelPerStudent from './Charts/BarChartLevelPerStudent'


class Courses extends Component {

  render() {
    const CCdata = this.props.data;

    return (
      CCdata ?
      <div className='courses-main-container'>
          <h1>Course Comparison</h1>
          <div className='courses-grid-container'>

          <div className='course-grid-item-joint'>
              <h2>Average Time per Level<h5> for each Course (in Seconds)</h5></h2>
              <BarChartTimePerLevel data = {CCdata["AverageTimePerLevel"]}/>
          </div>
              <div className='course-grid-item'>
                  <h4>Summary Statistics For Time Spent</h4>
                  <br/>
                  <br/>
                  <p><b>Median School: </b>{CCdata["AverageTimePerLevelSummaryStats"]["AverageData"]["AverageSchool"]}, {CCdata["AverageTimePerStudentSummaryStats"]["AverageData"]["Timing"]} Sec</p>
                  <br/>
                  <p><b>Standard Deviation: </b>{CCdata["AverageTimePerLevelSummaryStats"]["StandardDeviationStats"]["Standard Deviation"]}</p>
              </div>
          </div>

          <div className='courses-grid-container'>
          <div className='course-grid-item-joint'>
              <h2>Average Time per Student<h5> for each Course (in Seconds)</h5></h2>
              <BarChartTimePerStudent data = {CCdata["AverageTimePerStudent"]}/>
          </div>
              <div className='course-grid-item'>
                  <h4>Summary Statistics For Time Spent</h4>
                  <br/>
                  <br/>
                  <p><b>Median School: </b>{CCdata["AverageTimePerStudentSummaryStats"]["AverageData"]["AverageSchool"]}, {CCdata["AverageTimePerStudentSummaryStats"]["AverageData"]["Timing"]} Sec</p>
                  <br/>
                  <p><b>Standard Deviation: </b>{CCdata["AverageTimePerStudentSummaryStats"]["StandardDeviationStats"]["Standard Deviation"]}</p>
              </div>
          </div>

          <div className='courses-grid-container'>
          <div className='course-grid-item-joint'>
              <h2>Average Level per Student<h5> for each Course</h5></h2>
              <BarChartLevelPerStudent data = {CCdata["AverageLevelPerStudent"]}/>
          </div>
              <div className='course-grid-item'>
                  <h4>Summary Statistics</h4>
                  <br/>
                  <br/>
                  <p><b>Median School: </b>{CCdata["AverageLevelPerStudentSummaryStats"]["AverageData"]["AverageSchool"]}, {CCdata["AverageLevelPerStudentSummaryStats"]["AverageData"]["Timing"]} Sec</p>
                  <br/>
                  <p><b>Standard Deviation: </b>{CCdata["AverageLevelPerStudentSummaryStats"]["StandardDeviationStats"]["Standard Deviation"]}</p>
              </div>
          </div>

      </div> : <div style={{marginTop:"50vh"}}><Spinner /></div>
    );
  }
}

function mapStateToProps(state){
  return {
    data: state["cc_data"]
  };
};

export default connect(mapStateToProps)(Courses);
