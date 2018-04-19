import React, { Component } from 'react';
import Dialog, { DialogTitle,DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import CourseList from './CourseSelectionDialog/CourseList';
import './CourseSelectionDialog/CourseSelectionDialog.css';
import Spinner from '../../Misc/Spinner';

class CourseSelectionDialog extends Component {

  courseClickHandler = (courseID) => {
  	this.setState({selectedCourse:courseID})
  }

  dialogCloseHandler = (selectedCourse,status) => {
    this.props.dialogDisplayToggle();
    if (status === "save") {
    	this.props.dispatch({type:"SET_SELECTED_COURSE",payload:selectedCourse}); //Set course
    }
    else if (status === "cancel") { //Revert to original selection if cancel button is pressed
      this.setState({selectedCourse:this.props.selectedCourse})
    }
  }

  componentWillMount(){
  	this.setState({selectedCourse:this.props.selectedCourse})
  }

  render() {

		return (
	   	  <Dialog open = {this.props.open} 
	   	  	onEscapeKeyDown = {() => this.props.dialogDisplayToggle()} 
	   	  	className = "course-selection-dialog">

	   	  	<DialogTitle>Course selection</DialogTitle>


	   	  	{Object.keys(this.props.courseData).length !== 0 ? <CourseList
	   	  		courseClickHandler = {this.courseClickHandler}
	   	  		courseData = {this.props.courseData}
            selectedCourse = {this.state.selectedCourse} /> : <Spinner />}

          <DialogActions>
            <Button
              variant = "raised" 
              color = "secondary"
              onClick = {() => this.dialogCloseHandler(this.state.selectedCourse,"cancel")}
              children = "Cancel"/> 

            <Button 
              variant = "raised" 
              color = "primary" 
              onClick = {() => this.dialogCloseHandler(this.state.selectedCourse,"save")}
              children = "Save"/>
          </DialogActions>

	      </Dialog>
	    );
  }
}

function mapStateToProps(state){
	var courseData = state["all_raw_data"]
	var selectedCourse = state["selected_course"] //Obtain current selected course from redux store
	if (courseData!=null){ 
		return { courseData:courseData, selectedCourse:selectedCourse} 
	}
	else { 
		return {selectedCourse:selectedCourse}
	}
}

export default connect(mapStateToProps)(CourseSelectionDialog);
