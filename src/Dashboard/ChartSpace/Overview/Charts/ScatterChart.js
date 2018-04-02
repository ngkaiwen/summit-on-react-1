import React from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const scatterChart = (props) => {
    return (
    	<ScatterChart width={700} height={700} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
      	<XAxis dataKey={'x'} type="number" name='stature' unit='cm'/>
      	<YAxis dataKey={'y'} type="number" name='weight' unit='kg'/>
      	<CartesianGrid />
        <Scatter name='A school' data={props.data} fill='#8884d8'/>
      	<Tooltip cursor={{strokeDasharray: '3 3'}}/>
      </ScatterChart>
    );
};

export default scatterChart;
