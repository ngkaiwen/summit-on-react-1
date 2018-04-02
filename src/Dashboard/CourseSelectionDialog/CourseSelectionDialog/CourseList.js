import React, { Component } from 'react';
import CourseListItem from "./CourseListItem.js";
import List from 'material-ui/List';

class CourseList extends Component {

  obtainListOfCourses(){ //Obtain the list of courses from the props and pass it to the render function
  	var listOfCourses = [] //Used to ultimately return the list of courses to the render function
  	const courseData = this.props.courseData //Declare commonly used variables to make the code a little bit simpler - instead of refering to the props each time we need to use both functions we can just call it directly
  	const courseClickHandler = this.props.courseClickHandler
		
  	for (var key in courseData){ //Run through all the courseData (loaded from firebase)
  		var thisCourse = courseData[key]["courseInfo"]
  		listOfCourses.push( //Push one CourseListItem component onto the listOfCourses for each course in courseData
  			<CourseListItem 
  				courseName = {thisCourse["name"]}
          instructorName = {thisCourse["instructorName"]}
  				key = {key}
  				id = {key}
  				courseClickHandler = {courseClickHandler}
          selectedCourse = {this.props.selectedCourse}
  				/>
  		)
		}
  	return listOfCourses
  }




  render() {
    return (
    	<div className = "course-list-container">
      		<List style = {{ maxHeight:'100%', overflow:"auto"}} disablePadding = {true}>
        		{this.obtainListOfCourses()}
      		</List>
      	</div>
      );
  }
}

export default CourseList;
