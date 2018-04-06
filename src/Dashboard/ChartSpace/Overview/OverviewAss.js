import React from 'react';
import ScatterChart1 from './Charts/ScatterChart1'
import BarChart from './Charts/BarChart'

const overviewAss = (props) => {

  const numAssignments = Object.keys(props.data["assignments"]).length;
  const assignmentChart = props.data['courseInfo']['Charts']['AssignmentsByTime'];
  const scatterData = props.data['courseInfo']['Charts']['ScatterAss'];

  let barData = []
  for(let ass in assignmentChart){
    //console.log(assignmentChart[ass]);
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
                   <BarChart data={[
                            {name: 'Week 1', assignments: 2},
                            {name: 'Week 2', assignments: 1},
                            {name: 'Week 3', assignments: 3},
                            {name: 'Week 4', assignments: 5},
                            {name: 'Week 5', assignments: 3},
                            {name: 'Week 6', assignments: 2},
                            {name: 'Week 7', assignments: 2},
                            {name: 'Week 8', assignments: 1},
                            {name: 'Week 9', assignments: 0},
                            {name: 'Week 10', assignments: 2},
                            {name: 'Week 11', assignments: 1}
                      ]} />
                </div>

              
            </div>
          </div>);
};

export default overviewAss;
