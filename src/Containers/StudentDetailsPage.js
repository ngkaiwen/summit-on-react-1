import React, { Component } from 'react';
import StudentList from "../Components/StudentList/StudentList.js";
import {firebaseHandle} from "../Config/firebaseAPI.js";

class StudentDetailsPage extends Component {

  constructor(){
    super();
    this.state = {
      selectedStudent : null,
      studentData : {}
    }

    this.updateStudentData = this.updateStudentData.bind(this);
  }
  

  //Update list of students whenever this component is about to mount
  componentWillMount() {
    var firebaseStudentsDataset = firebaseHandle.database().ref("students")
    firebaseStudentsDataset.on("value",Snapshot => this.updateStudentData(Snapshot))
  }

  updateStudentData(Snapshot){ this.setState({studentData:Snapshot.val()}) }


  //Render function
  render() {
    
    return (
      <div>
        <StudentList data={this.state.studentData}/>
      </div>
      );
  }
}

export default StudentDetailsPage;
