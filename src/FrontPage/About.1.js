import React from 'react';

const about = (props) => {
  return (<div>
            <div className='main-container' id='docs'>
              <div className='about-box'>
                <h2>DOCUMENTATION</h2>
                <p>
                  Documentation for Summit is currently under construction and will be released at a later time.
                </p>
              </div>
            </div>
            <div className='main-container' id='contact'>
              <div className='about-box'>
                <h2>CONTACT</h2>
                  <p>
                    The codebase for Summit Analytics is available <a href="https://github.com/TheIanSim/summit-on-react">HERE on Github</a> <br/>
                    Team Members for Summit Analytics are: <br/>
                    <br/>
                    <b>Arthur Li | Tay Jia Hui | Ian Sim | Ng Kai Wen | Suen Wai Lun</b>
                  </p>
                </div>
              </div>
            </div>);
};

export default about;
