import React, { Component } from 'react';
import Overview from './Overview/Overview';
import StudentDetailsPage from './Students/StudentDetailsPage';
import AssignmentDetailsPage from './Assignments/AssignmentDetailsPage';

class chartSpace extends Component {

  render() {
    //Renders or does not render a particular chart depending on which page was selected in the toolbar
    let ovw = (this.props.type === 'overview') ? <Overview /> : null;
    let stulst = (this.props.type === 'studentsList') ? <StudentDetailsPage /> : null;
    let assign = (this.props.type === 'assignmentsList') ? <AssignmentDetailsPage /> : null;

    return (
        <div className="Overview-container">
          {ovw}
          {stulst}
          {assign}
        </div>
    );
  }
}

export default chartSpace;
