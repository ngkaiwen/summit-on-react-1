import React from 'react';
import Spinner from '../../../Misc/Spinner';

const overviewStu = (props) => {

  const numStudents = Object.keys(props.data['students']).length;
  //console.log(props.data);

  return (
          <div>
              <div className='Overview-grid-container'>

                  <div className='Overview-grid-item'>
                    <h1>{numStudents}</h1>
                    <h2>Students</h2>
                  </div>

                  <div className='Overview-grid-item'>
                  <p>test</p>
                  </div>

                  <div className='Overview-grid-item1'>
                  <p>test</p>
                  </div>

                  <div className='Overview-grid-item'>
                  <p>test</p>
                  </div>

                  <div className='Overview-grid-item'>
                  <p>test</p>
                  </div>

            </div>
          </div>
  );
};

export default overviewStu;
