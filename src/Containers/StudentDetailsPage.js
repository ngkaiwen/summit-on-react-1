import React, { Component } from 'react';
import StudentList from "../Components/StudentList/StudentList.js";
import {firebaseHandle} from "../Config/firebaseAPI.js";

class StudentDetailsPage extends Component {

  constructor(){
    super();
    this.state = { // Initialise
      selectedStudent : null,
      studentData : {}
    }

    this.updateStudentData = this.updateStudentData.bind(this);
    this.studentClickHandler = this.studentClickHandler.bind(this);
  }
  

  //Update list of students whenever this component is about to mount
  componentWillMount() {
    var firebaseStudentsDataset = firebaseHandle.database().ref("students")
    firebaseStudentsDataset.on("value",Snapshot => this.updateStudentData(Snapshot))
  }

  updateStudentData(Snapshot){ this.setState({studentData:Snapshot.val()}) }

  /*
  The studentClickHandler function is used to handle clicks on the student list.
  It updates the state of selectedStudent in the StudentDetailsPage component
  */
  studentClickHandler(key) { 
    this.setState({selectedStudent:key}) 
    console.log("Selected student with student ID: " + key)
  }


  //Render function
  render() {
    
    return (
      <div>
        <StudentList studentData={this.state.studentData} studentClickHandler = {this.studentClickHandler}/>
      </div>
      );
  }
}

export default StudentDetailsPage;
