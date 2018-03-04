import React, { Component } from 'react';
import Toolbar from '../Components/Toolbar';
import ChartSpace from './ChartSpace';

class dashboard extends Component {

  state = {
    displayChart: 'overview'
  }

  toolbarClickHandler = (chartType) => {
    this.setState({displayChart: chartType})
    console.log(this.state);
  }

  render() {
    return (<div className='dashboard-background'>
            <Toolbar clicked={this.toolbarClickHandler}/>
            <ChartSpace type={this.state.displayChart}/>
            </div>
    );
  }
}

export default dashboard;
