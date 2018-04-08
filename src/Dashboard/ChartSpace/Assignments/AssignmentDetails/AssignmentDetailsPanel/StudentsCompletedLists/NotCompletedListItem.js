import React, { Component } from 'react';
import { ListItem, ListItemText } from 'material-ui/List';

class NotCompletedListItem extends Component {

  render() {

    return (
      <ListItem>
      <ListItemText primary = {this.props.name}/>
            </ListItem>
    );
  }
}

export default NotCompletedListItem;
