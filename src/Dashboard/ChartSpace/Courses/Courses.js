import React, { Component } from 'react';
import { connect } from 'react-redux';
import BarChartTimePerLevel from './Charts/BarChartTimePerLevel'
import BarChartTimePerStudent from './Charts/BarChartTimePerStudent'
import LineChartLevelPerStudent from './Charts/LineChartLevelPerStudent'
import LineChartLevels75 from './Charts/LineChartLevels75'

class Courses extends Component {

  render() {
    const CCdata = this.props.data;

    return (
      CCdata ?
      <div className='courses-main-container'>
          <h1>Course Comparison</h1>
          <div className='courses-grid-container'>

          <div className='course-grid-item-joint'>
              <h2>Distribution of average time spent per level<h5> for students in each Course (Minutes)</h5></h2>
              <BarChartTimePerLevel data = {CCdata["AverageTimePerLevel"]}/>
          </div>
              <div className='course-grid-item'>
                  <h4>Summary Statistics For Time Spent</h4>
                  <br/>
                  <br/>
                  <p><b>Median School: </b>{CCdata["AverageTimePerLevelSummaryStats"]["AverageData"]["AverageSchool"]}, {CCdata["AverageTimePerStudentSummaryStats"]["AverageData"]["Timing"]} Min</p>
                  <br/>
                  <p><b>Standard Deviation: </b>{CCdata["AverageTimePerLevelSummaryStats"]["StandardDeviationStats"]["Standard Deviation"]}</p>
              </div>
          </div>

          <div className='courses-grid-container'>
          <div className='course-grid-item-joint'>
              <h2>Distribution of average time spent<h5> for students in each Course (Minutes)</h5></h2>
              <BarChartTimePerStudent data = {CCdata["AverageTimePerStudent"]}/>
          </div>
              <div className='course-grid-item'>
                  <h4>Summary Statistics For Time Spent</h4>
                  <br/>
                  <br/>
                  <p><b>Median School: </b>{CCdata["AverageTimePerStudentSummaryStats"]["AverageData"]["AverageSchool"]}, {CCdata["AverageTimePerStudentSummaryStats"]["AverageData"]["Timing"]} Min</p>
                  <br/>
                  <p><b>Standard Deviation: </b>{CCdata["AverageTimePerStudentSummaryStats"]["StandardDeviationStats"]["Standard Deviation"]}</p>
              </div>
          </div>

          <div className='courses-grid-container'>
          <div className='course-grid-item-joint'>
              <h2>Distribution of average levels completed<h5> for students in each course</h5></h2>
              <LineChartLevelPerStudent data = {CCdata["AverageLevelPerStudent"]}/>
          </div>
              <div className='course-grid-item'>
                  <h4>Summary Statistics</h4>
                  <br/>
                  <br/>
                  <p><b>Median School: </b>{CCdata["AverageLevelPerStudentSummaryStats"]["AverageData"]["AverageSchool"]}, {CCdata["AverageLevelPerStudentSummaryStats"]["AverageData"]["Levels"]}</p>
                  <br/>
                  <p><b>Standard Deviation: </b>{CCdata["AverageLevelPerStudentSummaryStats"]["StandardDeviationStats"]["Standard Deviation"]}</p>
              </div>
          </div>

          <div className='courses-grid-container'>
          <div className='course-grid-item-joint'>
              <h2>Maximum Number of Levels Completed (>=75% Completion Rate)<h5> for each Course</h5></h2>
              <LineChartLevels75 data = {CCdata["MaxLevels75Course"]}/>
          </div>
          <div className='course-grid-item'>
              <h4>Summary Statistics</h4>
              <br/>
              <br/>
              <p><b>Median School: </b>{CCdata["MaxLevels75CourseSummaryStats"]["AverageData"]["AverageSchool"]}, {CCdata["AverageLevelPerStudentSummaryStats"]["AverageData"]["Levels"]}</p>
              <br/>
              <p><b>Standard Deviation: </b>{CCdata["MaxLevels75CourseSummaryStats"]["StandardDeviationStats"]["Standard Deviation"]}</p>
          </div>
          </div>

      </div> : null
    );
  }
}

function mapStateToProps(state){
  return {
    data: state["cc_data"]
  };
};

export default connect(mapStateToProps)(Courses);
