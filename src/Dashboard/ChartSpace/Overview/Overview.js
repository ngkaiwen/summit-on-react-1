import React, { Component } from 'react';
import { connect } from 'react-redux';
import OverviewStu from './OvervieStu';
import OverviewAss from './OverviewAss';
import Spinner from '../../../Misc/Spinner';

class Overview extends Component {


  render() {

    let output = <div style={{marginTop:"50vh"}}><Spinner /></div>;

    if (this.props.state["all_raw_data"][this.props.selected_course]) {
      const courseName = this.props.state["all_raw_data"][this.props.selected_course]["courseInfo"]["name"];
      const instructorName = this.props.state["all_raw_data"][this.props.selected_course]["courseInfo"]["instructorName"];
      const isPublic = this.props.state["all_raw_data"][this.props.selected_course]["courseInfo"]["isPublic"];
      const owner = this.props.state["all_raw_data"][this.props.selected_course]["courseInfo"]["owner"];

      let Assignments = null;
      let Students = null;

      if (this.props.state["all_raw_data"][this.props.selected_course]["assignments"]){
        Assignments = <OverviewAss data={this.props.selected_course}/>;
        //numAssignments = Object.keys(this.props.state["all_raw_data"][this.props.selected_course]["assignments"]).length;
      }else{
        Assignments = <div><br/><br/><h2>No Assignments</h2></div>
      }

      if (this.props.state["all_raw_data"][this.props.selected_course]["students"]){
        Students = <OverviewStu data={this.props.selected_course}/>;
        //numStudents = Object.keys(this.props.state["all_raw_data"][this.props.selected_course]["students"]).length;
      }else{
        Students = <div><br/><br/><h2>No Students</h2></div>
      }
      
      output = <div className="Overview-container">
                  <div className="Overview-heading">
                    <h1>{courseName}</h1>
                    <h2><b>{instructorName}</b></h2>
                    {isPublic ? <h3>Public</h3> : <h3>Private</h3>}
                  </div>
                  {Assignments}
                  {Students}
               </div>;

      
    }
    return(
      output
    );
  }
}

  function mapStateToProps(state){
    var selected_course = state["selected_course"]; //Obtain data for the selected course
    if (selected_course != null){ //Check if the redux store has been updated with data from firebase
      console.log(state);
      return {selected_course:selected_course,
              state:state}
    }
    else { return {} }
  }

export default connect(mapStateToProps)(Overview);
