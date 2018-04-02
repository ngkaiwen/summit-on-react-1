import React, { Component } from 'react';
import { connect } from 'react-redux';
import OverviewStu from './OvervieStu';
import OverviewAss from './OverviewAss';

class overview extends Component {


  render() {
    if (this.props.state["all_raw_data"][this.props.selected_course]) {
      console.log(this.props.state["all_raw_data"][this.props.selected_course]["courseInfo"]["name"]);
    }
    return(
      <div className="Overview-container">
        {(this.props) ? <OverviewStu test={this.props.selected_course}/> : null }
        <OverviewAss />
      </div>
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

export default connect(mapStateToProps)(overview);
