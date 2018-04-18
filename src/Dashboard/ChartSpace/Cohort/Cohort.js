import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../Misc/Spinner';

class Cohort extends Component {

  render() {
    const cohortdata = this.props.data;
    console.log(cohortdata)
    return (
      cohortdata ?
      <div className='cohort-main-container'>
          <h1>Cohort Comparison</h1>
          <div className='cohort-grid-container'>

            <div className='cohort-grid-item-blank'>
                <h2>All courses</h2>
            </div>

            <div className='cohort-grid-item'>
                <h2>All courses</h2>
            </div>

            <div className='cohort-grid-item'>
                <h2>All courses</h2>
            </div>

            <div className='cohort-grid-item'>
                <h2>All courses</h2>
            </div>

            <div className='cohort-grid-item-joint'>
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
