import React, { Component } from 'react';
import CodeCombatLevels from './CodeCombatLevels';
import PieChart from './Charts/PieChart';
import LineChart from './Charts/LineChart'

class CodeCombat extends Component {

  state = {
    currentLevelID: null,
    currentLevelName: 'select a level'
  }

  levelClickHandler = (levelID,levelName) => {
    this.setState({
      currentLevelID: levelID,
      currentLevelName: levelName
    })
  }

  render() {
    return(
          <div className='Overview-CC-grid-container'>

              <div className='Overview-CC-grid-item1'>
              <h2>Select a level</h2>
                <CodeCombatLevels data={this.props.data} levelClickHandler={this.levelClickHandler}/>
              </div>

              <div className='Overview-CC-grid-item'>
                <h1 style={{fontWeight:700}}>Code Combat</h1>
                <h2 style={{fontWeight:100, fontSize:'1rem'}}>Overall Data</h2>
                <br/>
                <br/>
                <br/>
                <h3>Selected Level</h3>
                <h1>{this.state.currentLevelName}</h1>
              </div>

              <div className='Overview-CC-grid-item'>
                <h3>Cross Level Comparison</h3>
                <LineChart data={this.props.data['AcrossLevelsChart']} />
              </div>

              <div className='Overview-CC-grid-item'>
                <h3>Student Completion of level</h3>
                {this.state.currentLevelID ? <PieChart data={this.props.data['CompletionChartIdvAs'][this.state.currentLevelID]} /> : null}
              </div>

              <div className='Overview-CC-grid-item'>
                <h3>Overall Statistics</h3>
                <div style={{marginTop:"2rem"}}>
                <h1><b>{this.props.data['AcrossLevelsChart'].length}</b> Levels</h1>
                  {Object.keys(this.props.data['Overall Course Data']).map( (k) => {
                    return( <p key={k}>{k}: <b>{this.props.data['Overall Course Data'][k]}</b></p> )
                  })}
                </div>
              </div>

          </div>
    );
  }
}


export default CodeCombat;
