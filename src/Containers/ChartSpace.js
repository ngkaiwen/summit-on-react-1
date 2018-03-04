import React, { Component } from 'react';
import Overview from './Charts/Overview';
import Students from './Charts/Students';

class chartSpace extends Component {


  render() {

    let ovw = (this.props.type === 'overview') ? <Overview /> : null;
    let stu = (this.props.type === 'students') ? <Students /> : null;

    return (
      <div>
        {ovw}
        {stu}
      </div>

    );
  }
}

export default chartSpace;
