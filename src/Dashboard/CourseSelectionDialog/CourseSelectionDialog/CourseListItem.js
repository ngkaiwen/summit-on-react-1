import React, { Component } from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class StudentListItem extends Component {

  render() {

    return (
      <ListItem 
      	button = {true} 
      	divider = {true} 
      	onClick = {() => this.props.courseClickHandler(this.props.id)}>
      	<ListItemText primary = {this.props.courseName} secondary = {this.props.instructorName}/>
      	<Checkbox checked = {this.props.selectedCourse === this.props.id}/>
      </ListItem>
    );
  }
}

export default StudentListItem;
