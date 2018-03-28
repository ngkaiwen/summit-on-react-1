import React, { Component } from 'react';
import Overview from './Charts/Overview';
import Students from './Charts/Students';
import StudentDetailsPage from "./StudentDetailsPage.js";

class chartSpace extends Component {

  render() {
    //Renders or does not render a particular chart depending on which page was selected in the toolbar
    let ovw = (this.props.type === 'overview') ? <Overview /> : null; 
    let stu = (this.props.type === 'students') ? <Students /> : null;
    let stulst = (this.props.type === 'studentsList') ? <StudentDetailsPage /> : null;

    return (
        <div>
          {ovw}
          {stu}
          {stulst}
        </div>
    );
  }
}

export default chartSpace;
