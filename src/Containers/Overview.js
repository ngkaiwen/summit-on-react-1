import React, { Component } from 'react';
import TwoLevelPieChart from './Charts/TwoLevelPieChart'

class overview extends Component {

  render() {
    return (<div className="students-chart-container">
              <TwoLevelPieChart />
            </div>);
  }
}

export default overview;
