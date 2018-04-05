import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const lineChart = (props) => {

    return (
    	<LineChart width={600} height={300} data={props.data} style={{margin:"auto"}}>
       <XAxis dataKey="levelName"/>
       <YAxis/>
       <Tooltip/>
       <Line type="monotone" dataKey="Completed" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
    );
};

export default lineChart;
