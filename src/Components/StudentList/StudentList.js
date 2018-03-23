import React, { Component } from 'react';
import StudentListItem from "./StudentListItem.js";
import List from 'material-ui/List';
import "./StudentList.css";

class StudentList extends Component {

  obtainListOfStudents(){ //Obtain the list of students from the props and pass it to the render function
  	var listOfStudents = [] //Used to ultimately return the list of students to the render function
  	const studentData = this.props.studentData //Declare commonly used variables to make the code a little bit simpler - instead of refering to the props each time we need to use both functions we can just call it directly
  	const studentClickHandler = this.props.studentClickHandler

  	for (var key in studentData){
  		var thisStudent = studentData[key]
  		listOfStudents.push( //Push one StudentListItem component onto the listOfStudents for each student in studentData
  			<StudentListItem 
  				name = {thisStudent["name"]} 
  				picture = {thisStudent["photoURL"]} 
  				key = {key}
  				id = {key}
  				studentClickHandler = {this.props.studentClickHandler}
  				/>
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
