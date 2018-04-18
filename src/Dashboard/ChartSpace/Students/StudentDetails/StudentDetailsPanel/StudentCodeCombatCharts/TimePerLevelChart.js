import React, { Component } from 'react';
import { Tooltip,Legend, Bar, XAxis, YAxis, Line, ComposedChart} from "recharts";

class TimePerLevelChart extends Component {
  render(){

    const chartData = this.props.chartData

    return (
      <ComposedChart width={425} height={300} data={chartData}
      margin={{top: 25, right: 5, left: 0, bottom: 10}}>
     <XAxis dataKey="Label" tick = {false}/>
     <YAxis/>
     <Tooltip/>
     <Legend />
     <Bar dataKey="Course Minimum" stackId="a" fill="#AED581" />
     <Bar dataKey="Course Maximum" stackId="a" fill="#e79db6" />
     <Line type='monotone' dataKey='Time Taken' stroke='#07B4B6' />
    </ComposedChart>

    );
  }
}

export default TimePerLevelChart;
