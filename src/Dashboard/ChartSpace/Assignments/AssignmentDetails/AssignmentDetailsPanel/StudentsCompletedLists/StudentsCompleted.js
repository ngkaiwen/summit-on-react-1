import React, { Component } from 'react';
import CompletedListItem from "./CompletedListItem.js";
import List from 'material-ui/List';
//import { ListItem, ListItemText } from 'material-ui/List';

class StudentsCompleted extends Component {

      obtainListOfStudents(){ //Obtain the list of students from the props and pass it to the render function
        var listOfStudents = [] //Used to ultimately return the list of assignments to the render function
  	    const selectedAssignment = this.props.selectedAssignmentData
        const completed_student_names = selectedAssignment["completed student names"]
        //console.log(this.props.selectedAssignmentData)
          //console.log(completed_student_names)
        for (var key in completed_student_names){ //Run through all the assignmentData (loaded from firebase)
        //console.log(key)
          var thisStudent = completed_student_names[key]
        listOfStudents.push( //Push one AssignmentListItem component onto the listOfAssignments for each assignment in assignmentData
          <CompletedListItem
            name = {thisStudent}
            key = {key}
            id = {key}
            />)
          /*<CompletedListItem name = {thisStudent.toString()}/>)*/
          /*<ListItemText primary ={thisStudent.toString()}/>)*/
        }
        return listOfStudents
      }
  render() {
		return (
      <div className="students-completed">
        <List style = {{ maxHeight:'90%', overflow:"auto"}}>
          {this.obtainListOfStudents()}
        </List>
      </div>

	    );
	}
  }

export default StudentsCompleted;
