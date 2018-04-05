import React, { Component } from 'react';
import { ListItem, ListItemText } from 'material-ui/List';

class AssignmentListItem extends Component {

  render() {

    return (
      <ListItem onClick = {() => { this.props.assignmentClickHandler(this.props.id)}} button >

      <ListItemText primary = {this.props.name}/>
      <ListItemText secondary = {this.props.type}/>
      </ListItem>
    );
  }
}

export default AssignmentListItem;
