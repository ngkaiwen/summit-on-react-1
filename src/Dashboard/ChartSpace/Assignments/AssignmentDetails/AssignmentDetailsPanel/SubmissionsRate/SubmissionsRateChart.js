import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';

const SubmissionsRateChart = (props) => {

    return (
    	<LineChart width={600} height={300} selectedData={props.selectedData} style={{margin:"auto"}}>
       <XAxis dataKey="Date"/>
       <YAxis/>
       <Tooltip/>
       <Line type="monotone" dataKey="Students" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
    );
};

export default SubmissionsRateChart;
