import React, { Component } from 'react';
import StudentList from "../Components/StudentDetails/StudentList.js";
import StudentDetailsPanel from "../Components/StudentDetails/StudentDetailsPanel.js";
import {firebaseHandle} from "../Config/firebaseAPI.js";

class StudentDetailsPage extends Component {

  constructor(){
    super();
    this.state = { // Initialise
      selectedStudent : null,
      selectedStudentData : {},
      studentData : {},
      assignmentData : {}
    }

    this.updateStudentData = this.updateStudentData.bind(this);
    this.studentClickHandler = this.studentClickHandler.bind(this);
  }
  

  //Update list of students whenever this component is about to mount
  componentWillMount() {
    const dataLocation = "courses/" + this.props.selectedModule;
    var firebaseStudentsDataset = firebaseHandle.database().ref(dataLocation);
    firebaseStudentsDataset.on("value",Snapshot => this.updateStudentData(Snapshot));
  }

  /*The updateStudentData function is used by the firebase handle (see componentWillMount function above)
  to update the state of the StudentDetailsPage component (specifically, the studentData dictionary)
  */
  updateStudentData(Snapshot){ 
    this.setState({studentData:Snapshot.val()["students"]})
    this.setState({assignmentData:Snapshot.val()["assignments"]})
  }

  /*
  The studentClickHandler function is used to handle clicks on the student list.
  It updates the state of selectedStudent in the StudentDetailsPage component
  */
  studentClickHandler(key) { 
    this.setState({ selectedStudent:key });
    console.log("Selected student with student ID: " + key);
    this.setState({ selectedStudentData:this.state.studentData[key] });
  }


  //Render function
  render() {
    
    return (
      <div>
        <StudentList 
          studentData={this.state.studentData} 
          studentClickHandler = {this.studentClickHandler}
          selectedModule = {""}/>
        <StudentDetailsPanel selectedStudentData = {this.state.selectedStudentData} assignmentData = {this.state.assignmentData}/>
      </div>
      );
  }
}

export default StudentDetailsPage;
