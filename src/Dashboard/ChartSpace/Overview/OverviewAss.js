import React from 'react';
import ScatterChart1 from './Charts/ScatterChart1'
import BarChart from './Charts/BarChart'

const overviewAss = (props) => {

  const numAssignments = Object.keys(props.data["assignments"]).length;
  //const assignmentChart = props.data['courseInfo']['Charts']['AssignmentsByTime'];
  const scatterData = props.data['courseInfo']['Charts']['ScatterAss'];

  let rawBarData = props.data['courseInfo']['Charts']['AssignmentsByTime']['Assignment Figure'];
  let barData = []

  for(let i=0; i<rawBarData.length; i++){
    barData.push({
      name: (i+1),
      Assignments: (rawBarData[i] ? rawBarData[i]['Figure'] :0)
    });
  }

  return (<div>
            <div className='Overview-grid-container'>

                <div className='Overview-grid-item'>
                  <h1>Assignment</h1>
                  <h2>Overall Data</h2>
                </div>

                <div className='Overview-grid-item'>
                  <h1>{numAssignments}</h1>
                  <h2>Assignments</h2>
                </div>

                <div className='Overview-grid-item1'>
                  <h3>Overall Student data per Assignment</h3>
                  <ScatterChart1  data={scatterData}/>
                </div>

                <div className='Overview-grid-item2'>
                  <h3>Number of Assignments per week</h3>
                   <BarChart data={barData} />
                </div>

              
            </div>
          </div>);
};

export default overviewAss;
