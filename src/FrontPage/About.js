import React from 'react';

const about = (props) => {
  return (<div>
            <div className='main-container' id='about'>
              <div className='about-box'>
                <h2>ABOUT</h2>
                <p>
                Summit Analytics is a web application that empowers educators from the National University of Singapore to make more informed decisions when crafting lessons and assignments. Educators can look forward to various analytical features that will allow them to tailor their module content to their students’ needs. The application also allows educators to better track the progress of their students based on data visualizations and statistics.
                </p>
              </div>
            </div>
            <div className='main-container' id='services'>
              <div className='about-box'>
                <h2>DATA</h2>
                  <p>
                    Data for Summit Analytics was generously provided by Prof Chris Boesch, using data collected from his Achievements application as part of the project requirement for BT3103 AY 17/18. This module aims to train students to be conversant in the technologies, approaches, principles and issues in designing IT applications systems for business analytics. Major topics include: rapid web frameworks, scripting languages, database design, web and mobile interfaces, tracking and analysis of customers, payment services / verification, implementing security, designing and deploying web and mobile services, and operational considerations and technical tradeoffs. 
                  </p>
                </div>
              </div>
            </div>);
};

export default about;
