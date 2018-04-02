import React, { Component } from 'react';
import Overview from './Overview/Overview';
import StudentDetailsPage from './Students/StudentDetailsPage.js';

class chartSpace extends Component {

  render() {
    //Renders or does not render a particular chart depending on which page was selected in the toolbar
    let ovw = (this.props.type === 'overview') ? <Overview /> : null;
    let stulst = (this.props.type === 'studentsList') ? <StudentDetailsPage /> : null;

    return (
        <div className="Overview-container">
          {ovw}
          {stulst}
        </div>
    );
  }
}

export default chartSpace;
