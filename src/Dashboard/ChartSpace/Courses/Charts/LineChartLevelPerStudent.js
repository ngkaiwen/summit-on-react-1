import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class LineChartLevelPerStudent extends Component {
  render(){

    const data = this.props.data

    return (

    <ResponsiveContainer width="100%" height="90%">
      <LineChart    data={data}
      margin={{top: 20, right: 10, left: 10, bottom: 20}}>
      <XAxis dataKey="Course"  tick={false}/>
      <YAxis/>
      <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#fd5880" activeDot={{r: 8}}/>
      </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default LineChartLevelPerStudent;
