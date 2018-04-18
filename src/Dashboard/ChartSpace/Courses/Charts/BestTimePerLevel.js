import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

class BestTimePerLevel extends Component {
  render(){

    const data = this.props.data

    return (
      <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}
                  margin={{top: 20, right: 10, left: 10, bottom: 20}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="Course" label={{value: "Course Names", offset: 0, position: "bottom"}}/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default BestTimePerLevel;
