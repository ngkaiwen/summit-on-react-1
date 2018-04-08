import React, { Component } from 'react';
import { ListItem, ListItemText } from 'material-ui/List';

class CompletedListItem extends Component {

  render() {

    return (
      <div className = "list-item">
      <ListItem>
      <ListItemText primary = {this.props.name}/>
            </ListItem>
            </div>

    );
  }
}

export default CompletedListItem;
