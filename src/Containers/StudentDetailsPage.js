import React, { Component } from 'react';
import StudentList from "../Components/StudentDetails/StudentList.js";
import StudentDetailsPanel from "../Components/StudentDetails/StudentDetailsPanel.js";
import { connect } from 'react-redux';

class StudentDetailsPage extends Component {

  constructor(){
    super();
    this.state = { // Initialise
      selectedStudent : null,
      selectedStudentData : {},
    }

    this.studentClickHandler = this.studentClickHandler.bind(this);
  }

  /*
  The studentClickHandler function is used to handle clicks on the student list.
  It updates the state of selectedStudent in the StudentDetailsPage component
  */
  studentClickHandler(key) { 
    this.setState({ selectedStudent:key });
    console.log("Selected student with student ID: " + key);
    this.setState({ selectedStudentData:this.props.studentData[key] });
  }


  //Render function
  render() {
    if (this.props.studentData!=null){
      return (
        <div>
          <StudentList 
            studentData={this.props.studentData}
            studentClickHandler = {this.studentClickHandler}
            selectedModule = {""}/>
          <StudentDetailsPanel selectedStudentData = {this.state.selectedStudentData} assignmentData = {this.props.assignmentData}/>
        </div>
        );
    }
    else { return null }
  }
}

function mapStateToProps(state){
    var courseData = state["all_raw_data"][state["selected_course"]]
    if (courseData!=null){
      return {studentData:courseData["students"],
            assignmentData:courseData["assignments"] }
    }
    else { return {} }
}

export default connect(mapStateToProps)(StudentDetailsPage);
