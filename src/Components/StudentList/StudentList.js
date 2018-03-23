import React, { Component } from 'react';
import StudentListItem from "./StudentListItem.js";
import List from 'material-ui/List';
import "./StudentList.css";

class StudentList extends Component {

  obtainListOfStudents(){ //Obtain the list of students from the props and pass it to the render function
  	var listOfStudents = []

  	for (var key in this.props.data){
  		var thisStudent = this.props.data[key]
  		listOfStudents.push(
  			<StudentListItem name = {thisStudent["name"]} picture = {thisStudent["photoURL"]} key = {key}/>
  		)
  	}
  	return listOfStudents
  }




  render() {
    return (
    	<div className = "scrollable-list-container">
      		<List style = {{ maxHeight:'100%', overflow:"auto"}}>
        		{this.obtainListOfStudents()}
      		</List>
      	</div>
      );
  }
}

export default StudentList;
