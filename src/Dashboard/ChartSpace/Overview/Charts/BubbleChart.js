import React from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const bubbleChart = (props) => {

    const parseDomain = () => {
        return [
          0,
          Math.max.apply(null, [
            ...props.data.map(entry => entry.value)
          ])
        ];
      };

    const domain = parseDomain();
    const range = [16, 225];

    return (
        <ScatterChart width={600} height={60} margin={{top: 10, right: 0, bottom: 0, left: 0}}>
            <XAxis type="category" dataKey="hour" interval={0} tick={{ fontSize: 0 }} tickLine={{ transform: 'translate(0, -6)' }} label={{ value: 'Week'}}/>
            <YAxis type="number" dataKey="index" name="week" height={10} width={50} tick={false} tickLine={false} axisLine={false} label={{ value: 'Week', position: 'insideRight' }}/>
            <ZAxis type="number" dataKey="value" domain={domain} range={range} />
            <Tooltip cursor={{strokeDasharray: '3 3'}} wrapperStyle={{ zIndex: 100 }} content={this.renderTooltip} />
            <Scatter data={props.data} fill='#8884d8'/>
          </ScatterChart>
    );
};

export default bubbleChart;

