import React from 'react';
import Spinner from '../../../Misc/Spinner';
import ScatterChart from './Charts/ScatterChart';

const overviewStu = (props) => {

  const numStudents = Object.keys(props.data['students']).length;
  console.log(props.data);
  const scatterData = props.data['courseInfo']['Charts']['ScatterStudent'];

  const weakestStu = (data) => {
    let studentList = props.data['students'];
    let output = [];
    for (let stu in studentList){
      let student = props.data['students'][stu];
      let stuName = student['profile']['displayName'];
      let stuPercentile = student['displayData']['assignmentPercentiles']['average'];
      output.push([stuPercentile,stuName]);
    }
    output.sort();
    return(output.slice(0,5));
  }

  return (
    
          <div>
              <div className='Overview-grid-container'>

                  <div className='Overview-grid-item'>  
                    <h1>Student</h1>
                    <h2>Overall Data</h2>
                  </div>

                  <div className='Overview-grid-item'>
                    <h1>{numStudents}</h1>
                    <h2>Students</h2>
                  </div>

                  <div className='Overview-grid-item1'>
                    <h3>Overall Assignment data per student</h3>
                    <ScatterChart  data={scatterData}/>
                  </div>

                  <div className='Overview-grid-item2'>
                    <h3>Weakest Students</h3>
                    <ul className={"weakestStudentsList"}>
                      {weakestStu(props.data).map(
                        (stu) => {
                          return <li key={stu[1]} className={"weakestStudentsListItem"}>
                                  <p><b>{stu[1]}</b> {stu[0]} Percentile </p>
                                </li> 
                        }
                      )}
                    </ul>
                  </div>

            </div>
          </div>
  );
};

export default overviewStu;
