import React, { Component } from 'react';
import CompletedListItem from "./CompletedListItem.js";
import List from 'material-ui/List';

class StudentsCompleted2 extends Component {

      obtainListOfStudents(){ //Obtain the list of students from the props and pass it to the render function
        //var listOfStudents = [] //Used to ultimately return the list of assignments to the render function
  	    const selectedAssignment = this.props.selectedAssignmentData
          	const assignmentClickHandler = this.props.assignmentClickHandler
        var completed_student_names = selectedAssignment["completed_student_names"]
        console.log(this.props.selectedAssignmentData)
          console.log(completed_student_names)
return completed_student_names
      }
  render() {
		return (
      <div className="students-completed">
        <List style = {{ maxHeight:'50%', overflow:"auto"}}>
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
export default StudentsCompleted2;
