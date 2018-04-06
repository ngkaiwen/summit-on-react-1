import React from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer} from 'recharts';

const scatterChart1 = (props) => {
    return (
			<ResponsiveContainer width="100%" height="100%">
			<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 60 }} >
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

				<Tooltip cursor={{ strokeDasharray: '3 3' }}
									label={'name'} />

        <Scatter name='ScatterStu' data={props.data} fill='#82ca9d'>
					{//<LabelList dataKey="name" position="top" />
					}
				</Scatter>
      </ScatterChart>
			</ResponsiveContainer>
		
    );
};

export default scatterChart1;
