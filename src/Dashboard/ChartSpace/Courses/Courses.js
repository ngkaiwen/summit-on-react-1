import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../Misc/Spinner';
import BarChartTimePerLevel from './Charts/BarChartTimePerLevel'
import BestTimePerLevel from './Charts/BestTimePerLevel'
import WorstTimePerLevel from './Charts/WorstTimePerLevel'
import BarChartTimePerStudent from './Charts/BarChartTimePerStudent'


class Courses extends Component {

  render() {
    const CCdata = this.props.data;

    return (
      CCdata ?
      <div className='courses-main-container'>
          <h1>Course Comparison</h1>
          <div className='courses-grid-container'>

          <div className='course-grid-item-joint'>
              <h2>All courses</h2>
              <BarChartTimePerLevel data = {CCdata["AverageTimePerLevel"]}/>
          </div>
              <div className='course-grid-item'>
                  <h2>Average Time Spent per Level for each Course (in Seconds)</h2>
                  <h3>Median School: {CCdata["AverageTimePerLevelSummaryStats"]["AverageData"]["AverageSchool"]}</h3>
                  <h3>{CCdata["AverageTimePerLevelSummaryStats"]["AverageData"]["Time"]} Sec</h3>
                  <h3>Standard Deviation: {CCdata["AverageTimePerLevelSummaryStats"]["StandardDeviationStats"]["Standard Deviation"]}</h3>
              </div>

          </div>

          <div className='courses-grid-container'>
          <div className='course-grid-item-joint'>
              <h2>Average Time Spent per Student for each Course (in Seconds)</h2>
              <BarChartTimePerStudent data = {CCdata["AverageTimePerStudent"]}/>
          </div>
              <div className='course-grid-item'>
                  <h2>Summary Statistics For Time Spent</h2>
                  <br/>
                  <br/>
                  <p><b>Median School: </b>{CCdata["AverageTimePerStudentSummaryStats"]["AverageData"]["AverageSchool"]}, {CCdata["AverageTimePerStudentSummaryStats"]["AverageData"]["Timing"]} Sec</p>
                  <br/>
                  <p><b>Standard Deviation: </b>{CCdata["AverageTimePerStudentSummaryStats"]["StandardDeviationStats"]["Standard Deviation"]}</p>
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
