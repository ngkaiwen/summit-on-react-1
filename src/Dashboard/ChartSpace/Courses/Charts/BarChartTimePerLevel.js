import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

class BarChartTimePerLevel extends Component {
  render(){

    const data = this.props.data

    return (
      <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}
          margin={{top: 20, right: 10, left: 10, bottom: 20}}>
          <XAxis dataKey="Course" tick={false}/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#00ced1" />
          </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default BarChartTimePerLevel;
