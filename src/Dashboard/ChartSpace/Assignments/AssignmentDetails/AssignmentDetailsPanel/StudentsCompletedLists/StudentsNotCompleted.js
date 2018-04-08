import React, { Component } from 'react';
import NotCompletedListItem from "./NotCompletedListItem.js";
import List from 'material-ui/List';
//import { ListItem, ListItemText } from 'material-ui/List';

class StudentsNotCompleted extends Component {

      obtainListOfStudents(){ //Obtain the list of students from the props and pass it to the render function
        var listOfStudents = [] //Used to ultimately return the list of assignments to the render function
  	    const selectedAssignment = this.props.selectedAssignmentData
                //console.log( selectedAssignment["not completed student names"] === undefined )
        if ( selectedAssignment["not completed student names"] === undefined ){ return null }

        else{
        const not_completed_student_names = selectedAssignment["not completed student names"]
        //console.log(this.props.selectedAssignmentData)
          //console.log(not_completed_student_names)
        for (var key in not_completed_student_names){ //Run through all the assignmentData (loaded from firebase)
        //console.log(key)
          var thisStudent = not_completed_student_names[key]
        listOfStudents.push( //Push one AssignmentListItem component onto the listOfAssignments for each assignment in assignmentData
          <NotCompletedListItem
            name = {thisStudent}
            key = {key}
            id = {key}
            />)
          /*<CompletedListItem name = {thisStudent.toString()}/>)*/
          /*<ListItemText primary ={thisStudent.toString()}/>)*/
        }
        return listOfStudents
      }
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
/**  <Grid item xs = {10}> //code for this section in detailspanel
    <StudentsCompleted
      selectedAssignmentData = {this.props.selectedAssignmentData}/>
  </Grid>**/
export default StudentsNotCompleted;
