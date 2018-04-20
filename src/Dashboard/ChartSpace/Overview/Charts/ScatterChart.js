import React from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import CustomTooltipStudent from './CustomTooltipStudent';

const scatterChart = (props) => {
    return (
			<ResponsiveContainer width="100%" height="100%">
			<ScatterChart 
										margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
				<CartesianGrid />
				<XAxis dataKey={'CompletionRate'} 
								type="number" 
								domain={['auto', 'auto']}
								name='Completion Rate'
								unit=''
								label={{value: "Completion Rate", offset: 0, position: "bottom"}}/>

				<YAxis dataKey={'assignmentAvgTime'} 
								type="number" 
								name='Average Time' 
								label={{ value: 'Average Time (Seconds)', angle: -90,  offset: 0, position: 'left' }}/>

				<Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltipStudent />} />


        <Scatter name='ScatterStu' data={props.data} fill='#8884d8'>
				</Scatter>
      </ScatterChart>
			</ResponsiveContainer>
		
    );
};

export default scatterChart;
