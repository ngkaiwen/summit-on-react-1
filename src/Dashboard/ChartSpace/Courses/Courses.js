import React, { Component } from 'react';

class Courses extends Component {

  render() {
    return (
        <div className='courses-main-container'>
            <h1>Course Comparison</h1>
            <div className='courses-grid-container'>
                <div className='course-grid-item'>
                    <h2>chart 1</h2>
                </div>

                <div className='course-grid-item'>
                    <h2>chart 2</h2>
                </div>

                <div className='course-grid-item'>
                    <h2>chart 3</h2>
                </div>

                <div className='course-grid-item'>
                    <h2>chart 4</h2>
                </div>
            </div>
        </div>
    );
  }
}

export default Courses;
