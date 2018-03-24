import React, { Component } from 'react';
import Toolbar from '../Components/Toolbar';
import ChartSpace from './ChartSpace';

class dashboard extends Component {

  state = {
    displayChart: 'overview'
  }

  toolbarClickHandler = (chartType) => {
    this.setState({displayChart: chartType})
  }

  render() {
    return (<div className='dashboard-background'>
              <div className='toolbar'> 
                <Toolbar clicked={this.toolbarClickHandler}/> 
              </div>
            <ChartSpace type={this.state.displayChart}/>
            </div>
    );
  }
}

export default dashboard;
