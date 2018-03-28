import React, { Component } from 'react';
//import studentAssignmentCompletionChart from "";

class StudentAssigmentsCompleted extends Component {

  render() {
  	const data = this.props.selectedStudentData
  	var solutions = data["submittedSolutions"]
  	console.log(solutions)
  	if (typeof solutions === "undefined") {solutions = []} //Check if no solutions have been submitted 

  	if ( Object.keys(data).length === 0){ return null } //Check whether a student has been selected in student list - do not render anything if nothing has been selected
	
	else {
		const numberOfAssignments = this.props.numberOfAssignments
		const numberOfAssignmentsCompletedByStudent = Object.keys(solutions).length
		const percentage = Math.round(numberOfAssignmentsCompletedByStudent*100/numberOfAssignments)
		return (
	   	  <div className="student-assignments-completed">
	      	Number of assignments completed: {numberOfAssignmentsCompletedByStudent} out of {numberOfAssignments} <br/>
	      	Percentage of assignments completed: {percentage}%
	      </div>
	    );
	}
  }
}

export default StudentAssigmentsCompleted;
