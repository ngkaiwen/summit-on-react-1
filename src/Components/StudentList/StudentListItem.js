import React, { Component } from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class StudentListItem extends Component {

  render() {

    return (
      <ListItem button = {true} divider = {true}>
      	<Avatar>
      	</Avatar>
      	<ListItemText primary = {this.props.name}/>
      </ListItem>
    );
  }
}

export default StudentListItem;
