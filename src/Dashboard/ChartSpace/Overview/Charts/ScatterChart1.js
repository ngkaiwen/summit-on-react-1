import React from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const scatterChart1 = (props) => {
    return (
			<ResponsiveContainer width="100%" height="100%">
			<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
				<CartesianGrid />
				<XAxis dataKey={'Completion Rate'} 
								type="number" 
								domain={['auto', 'auto']}
								name='Completion Rate'
								unit=''
								label={{value: "Completion Rate", offset: 0, position: "bottom"}}/>

				<YAxis dataKey={'Average Time'} 
								type="number" 
								name='Average Time' 
								label={{ value: 'Average Time (Seconds)', angle: -90,  offset: 0, position: 'left' }}/>

				<Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltipAssignment />} />

        <Scatter name='ScatterStu' data={props.data} fill='#82ca9d'>
				</Scatter>
      </ScatterChart>
			</ResponsiveContainer>
		
    );
};

export function CustomTooltipAssignment(props) {
	let payload = null;
    if (props.active) {
		payload  = props.payload;
        return (
            <div className='custom-tooltip'>
            <p className='desc'>Completion Rate: <b>{(payload[0].payload['Completion Rate']*100).toFixed(2)}%</b></p>
            <p className='desc'>Average Time: <b>{payload[1].payload['Average Time']} Seconds</b></p>
            </div>
        );
    }
    return null;
  }

export default scatterChart1;
