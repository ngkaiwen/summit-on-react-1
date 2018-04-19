import React, { Component } from 'react';
import StudentList from "./StudentDetails/StudentList/StudentList.js";
import StudentDetailsPanel from "./StudentDetails/StudentDetailsPanel/StudentDetailsPanel.js";
import "./StudentDetails/StudentDetails.css";
import { connect } from 'react-redux';
import Spinner from '../../../Misc/Spinner';

class StudentDetailsPage extends Component {

  constructor(){
    super();
    this.state = { // Initialise
      selectedStudent : null,
      selectedStudentData : {},
      courseHasChanged : false
    }

    this.studentClickHandler = this.studentClickHandler.bind(this);
  }

  /*
  The studentClickHandler function is used to handle clicks on the student list.
  It updates the state of selectedStudent in the StudentDetailsPage component
  */
  studentClickHandler(key) { 
    this.setState({ selectedStudent:key });
    //console.log("Selected student with student ID: " + key);
    this.setState({ selectedStudentData:this.props.studentData[key] });
  }

  componentWillUpdate(nextProps){
    if(nextProps.selectedCourse !== this.props.selectedCourse){
      this.setState({selectedStudentData:{}}) //Blank the student details display if we have switched courses
    }
  }


  //Render function
  render() {
    if (this.props.studentData!=null){ //Check if the redux store has been updated with data from firebase
      return (
        <div className="csfixed">
          <StudentList 
            studentData={this.props.studentData}
            studentClickHandler = {this.studentClickHandler}/>
          <StudentDetailsPanel 
            selectedStudentData = {this.state.selectedStudentData} 
            assignmentData = {this.props.assignmentData}/>
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

export default connect(mapStateToProps)(StudentDetailsPage);
