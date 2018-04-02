import React from 'react';
import ScatterChart from './Charts/ScatterChart'

const overviewAss = (props) => {
  return (<div>
            <div className='Overview-grid-container'>

                <div className='Overview-grid-item'>
                <p>test</p>
                </div>

                <div className='Overview-grid-item'>
                <p>test</p>
                </div>

                <div className='Overview-grid-item1'>
                    <h1 style={{color:'black'}}>Chart heading</h1>
                    <ScatterChart  data={[{x: 100, y: 200, z: 200}, {x: 120, y: 100, z: 260},
                  {x: 170, y: 300, z: 400}, {x: 140, y: 250, z: 280},
                  {x: 150, y: 400, z: 500}, {x: 110, y: 2800, z: 200}]}/>
                </div>

                <div className='Overview-grid-item'>
                <p>test</p>
                </div>

                <div className='Overview-grid-item'>
                <p>test</p>
                </div>

            </div>
          </div>);
};

export default overviewAss;
