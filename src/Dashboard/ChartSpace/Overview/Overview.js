import React, { Component } from 'react';
import { connect } from 'react-redux';
import OverviewStu from './OvervieStu';
import OverviewAss from './OverviewAss';
import Spinner from '../../../Misc/Spinner';
import CodeCombat from './CodeCombat/CodeCombat';

class Overview extends Component {


  render() {

    console.log(this.props.state);

    let output = <div style={{marginTop:"50vh"}}><Spinner /></div>;

    if (this.props.state["all_raw_data"][this.props.selected_course]) {
      const courseName = this.props.state["all_raw_data"][this.props.selected_course]["courseInfo"]["name"];
      const instructorName = this.props.state["all_raw_data"][this.props.selected_course]["courseInfo"]["instructorName"];
      const isPublic = this.props.state["all_raw_data"][this.props.selected_course]["courseInfo"]["isPublic"];
      //const owner = this.props.state["all_raw_data"][this.props.selected_course]["courseInfo"]["owner"];

      let Assignments = null;
      let Students = null;
      let codeCombat = null;

      if (this.props.state["all_raw_data"][this.props.selected_course]["assignments"]){
        Assignments = <OverviewAss data={this.props.state["all_raw_data"][this.props.selected_course]}/>;
      }else{
        Assignments = <div><br/><br/><h2>No Assignments</h2></div>
      }

      if (this.props.state["all_raw_data"][this.props.selected_course]["students"]){
        Students = <OverviewStu data={this.props.state["all_raw_data"][this.props.selected_course]}/>;
      }else{
        Students = <div><br/><br/><h2>No Students</h2></div>
      }

      if (this.props.state["all_raw_data"][this.props.selected_course]["CodeCombat"]["AcrossLevelsChart"]){
        codeCombat = <CodeCombat data={this.props.state["all_raw_data"][this.props.selected_course]["CodeCombat"]}/>
      }
      
      output = <div className="Overview-container">
                  <div className="Overview-heading">
                    <h1>{courseName}</h1>
                    <h2><b>{instructorName}</b></h2>
                    {isPublic ? <h3>Public</h3> : <h3>Private</h3>}
                  </div>
                  {Students}
                  {Assignments}
                  {codeCombat}
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
    
      return {selected_course:selected_course,
              state:state}
    }
    else { return {} }
  }

export default connect(mapStateToProps)(Overview);
