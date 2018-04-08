import React, { Component } from 'react';
import StudentsCompleted from "./StudentsCompleted.js";
import StudentsNotCompleted from "./StudentsNotCompleted.js";

class CompletionLists extends Component {

  render() {
  	const selectedAssignment = this.props.selectedAssignmentData

    if ( Object.keys(selectedAssignment).length === 0){ return null } //Check whether an assignment has been selected in assignment list - do not render anything if nothing has been selected

  else {
    return (
      <div>
			<div className = "pane-title-left">
				Submitted
			</div>
      <div className = "pane-title-right">
        Did not Submit
      </div>
			<div className = "left-equal-sub-pane">
      <StudentsCompleted
      selectedAssignmentData = {this.props.selectedAssignmentData}
        assignmentClickHandler = {this.assignmentClickHandler}/>
  			</div>
  			<div className = "right-equal-sub-pane">
        <StudentsNotCompleted
        selectedAssignmentData = {this.props.selectedAssignmentData}
          assignmentClickHandler = {this.assignmentClickHandler}/>
  			</div>
  		</div>
  	);
  }
}
}

export default CompletionLists;
