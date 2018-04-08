import React, { Component } from 'react';
import AssignmentListItem from "./AssignmentListItem.js";
import List from 'material-ui/List';

class AssignmentList extends Component {

  obtainListOfAssignments(){ //Obtain the list of assignments from the props and pass it to the render function
  	var listOfAssignments = [] //Used to ultimately return the list of assignments to the render function
  	const assignmentData = this.props.assignmentData //Declare commonly used variables to make the code a little bit simpler - instead of refering to the props each time we need to use both functions we can just call it directly
  	const assignmentClickHandler = this.props.assignmentClickHandler
    //console.log(assignmentClickHandler)
  	for (var key in assignmentData){ //Run through all the assignmentData (loaded from firebase)
  		var thisAssignment = assignmentData[key]
      var orderIndex = thisAssignment["orderIndex"]
  		listOfAssignments.push( //Push one AssignmentListItem component onto the listOfAssignments for each assignment in assignmentData
  			[orderIndex, <AssignmentListItem
          name = {thisAssignment["name"]}
          id = {key.toString()}
          orderIndex = {thisAssignment["orderIndex"]}
  				type = {thisAssignment["questionType"]}
  				key = {key}
  				//id = {key}
  				assignmentClickHandler = {assignmentClickHandler}
  				/>]
  		)
  	}

    //console.log(listOfAssignments)
     listOfAssignments.sort(function(a,b){return a[0] - b[0]})
     //listOfAssignments.sort(function(a,b){return a[1] > b[1]}) ///using string
     //for itempair in listofAssignments
  	return listOfAssignments
  }




  render() {
    return (
    	<div className = "scrollable-list-container">
      		<List style = {{ maxHeight:'100%', overflow:"auto"}}>
						{this.obtainListOfAssignments().map( i => {
									return	<div className="assignmentListItem" key={i[0]}>ASSIGNMENT {i[0]}<span>{i[1]}</span></div>})
						} 
      		</List>
      	</div>
      );
  }
}

export default AssignmentList;
