import React from 'react';
import ScatterChart from './Charts/ScatterChart'
import BarChart from './Charts/BarChart'

const overviewAss = (props) => {

  const numAssignments = Object.keys(props.data["assignments"]).length;
  const assignmentChart = props.data['courseInfo']['Charts']['AssignmentsByTime'];

  let barData = []
  for(let ass in assignmentChart){
    //console.log(assignmentChart[ass]);
  }

  return (<div>
            <div className='Overview-grid-container'>

                <div className='Overview-grid-item'>
                    <h1>{numAssignments}</h1>
                    <h2>Assignments</h2>
                </div>

                <div className='Overview-grid-item'>
                  <p>helo</p>
                </div>

                <div className='Overview-grid-item1'>
                    <h1 style={{color:'black'}}>Chart heading</h1>
                    <ScatterChart  data={[{x: 100, y: 200, z: 200}, {x: 120, y: 100, z: 260},
                  {x: 170, y: 300, z: 400}, {x: 140, y: 250, z: 280},
                  {x: 150, y: 400, z: 500}, {x: 110, y: 2800, z: 200}]}/>
                </div>

                <div className='Overview-grid-item2'>
                   <BarChart data={[
                            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
                            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
                            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
                            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
                            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
                            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
                            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
                      ]} />
                </div>

              
            </div>
          </div>);
};

export default overviewAss;
