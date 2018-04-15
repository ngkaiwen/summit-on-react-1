import React, { Component } from 'react';
import AssignmentList from "./AssignmentDetails/AssignmentList/AssignmentList.js";
import AssignmentDetailsPanel from "./AssignmentDetails/AssignmentDetailsPanel/AssignmentDetailsPanel.js";
import "./AssignmentDetails/AssignmentDetails.css";
import { connect } from 'react-redux';
import Spinner from '../../../Misc/Spinner';

class AssignmentDetailsPage extends Component {

  constructor(){
    super();
    this.state = { // Initialise
      selectedAssignment : null,
      selectedAssignmentData : {},
      courseHasChanged : false
    }

    this.assignmentClickHandler = this.assignmentClickHandler.bind(this);
  }

  /*
  The assignmentClickHandler function is used to handle clicks on the assignment list.
  It updates the state of selectedAssignment in the AssignmentDetailsPage component
  */
  assignmentClickHandler(key) {
    this.setState({ selectedAssignment:key });
    console.log("Selected assignment with assignment ID: " + key);
    this.setState({ selectedAssignmentData:this.props.assignmentData[key] });
  }

  componentWillUpdate(nextProps){
    if(nextProps.selectedCourse !== this.props.selectedCourse){
      this.setState({selectedAssignmentData:{}}) //Blank the assignment details display if we have switched courses
    }
  }


  //Render function
  render() {
    if (this.props.assignmentData!=null){ //Check if the redux store has been updated with data from firebase
      return (
        <div className="csfixed">
          <AssignmentList 
            assignmentData={this.props.assignmentData}
            assignmentClickHandler = {this.assignmentClickHandler}/>
          <AssignmentDetailsPanel
            selectedAssignmentData = {this.state.selectedAssignmentData}
            assignmentData = {this.state.assignmentData}/>
        </div>
        );
    }
    else { return <div style={{marginTop:"50vh"}}><Spinner /></div> }
  }
}

function mapStateToProps(state){
    var courseData = state["all_raw_data"][state["selected_course"]] //Obtain data for the selected course
    if (courseData!=null){ //Check if the redux store has been updated with data from firebase
      return {studentData:courseData["students"],
            assignmentData:courseData["assignments"],
            selectedCourse:state["selected_course"] }
    }
    else { return {} }
}

export default connect(mapStateToProps)(AssignmentDetailsPage);
