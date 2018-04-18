import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../Misc/Spinner';

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
                <h2>All courses</h2>
            </div>

            <div className='cohort-grid-item'>
                <h2>CohortA</h2>
                <p style={{fontSize:22 ,color:"#f05683"}}>  <b> {cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["name"]}</b></p>
                <br/>
                <p style={{fontSize:20 ,color:"#142b9d"}}>{cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["size"]} Courses</p>
                <p style={{fontSize:14}}> Average Students Per Course: {Math.round(cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["averageSizePerCourse"])}</p>
                <p style={{fontSize:20 ,color:"#142b9d"}}> Instructor: {cohortdata["timeComparisonStats"]["-L60ng0QZnIUq5u3w3kU"]["instructor"]}</p>
            </div>

            <div className='cohort-grid-item'>
                <h2>CohortB</h2>
                <p style={{fontSize:22 ,color:"#f05683"}}>  <b> {cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["name"]}</b></p>
                <br/>
                <p style={{fontSize:20 ,color:"#142b9d"}}>{cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["size"]} Courses</p>
                <p style={{fontSize:14}}> Average Students Per Course: {Math.round(cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["averageSizePerCourse"])}</p>
                <p style={{fontSize:20 ,color:"#142b9d"}}> Instructor: {cohortdata["timeComparisonStats"]["-L60nbB_SwQIdvjEEIp7"]["instructor"]}</p>
            </div>

            <div className='cohort-grid-item'>
                <h2>CohortC</h2>
                <p style={{fontSize:22 ,color:"#f05683"}}>  <b> {cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["name"]}</b></p>
                <br/>
                <p style={{fontSize:20 ,color:"#142b9d"}}>{cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["size"]} Courses</p>
                <p style={{fontSize:14}}> Average Students Per Course: {Math.round(cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["averageSizePerCourse"])}</p>
                <p style={{fontSize:20 ,color:"#142b9d"}}> Instructor: {cohortdata["timeComparisonStats"]["-L60lMb7QBWxMsd0aIHE"]["instructor"]}</p>
            </div>

            <div className='cohort-grid-item-joint'>
              <div className='cohort-pane-title'>
                <p style={{fontSize:28 ,color:"#f05683"}}>  <b> Cohort Performance and Effort Metrics </b></p>
              </div>
                <div className='cohort-grid-item-joint-inner'>
                  <h2>internal</h2>
                </div>

                <div className='cohort-grid-item-joint-inner'>
                  <h2>internal</h2>
                </div>

                <div className='cohort-grid-item-joint-inner'>
                  <h2>internal</h2>
                </div>
                  <div className='cohort-grid-item-joint-inner'>
                    <h2>internal</h2>
                  </div>
            </div>

            <div className='cohort-grid-item-joint'>
                <h2>All courses</h2>
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
