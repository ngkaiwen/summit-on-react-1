import React, { Component } from 'react';
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ReferenceLine,ResponsiveContainer } from "recharts";

class StudentCompletionTimePercentileChart extends Component {

  render() {
    const chartData = this.props.chartData["data"]

    return (
        <div className = "chart">
          <ResponsiveContainer width="100%" height = {330}>
            <LineChart data={chartData} margin={{top: 30, bottom: 0}}>
               <XAxis dataKey="Name" tick = {false}/>
               <YAxis />
               <Tooltip />
               <Legend align = "center" verticalAlign = "bottom" height={40}/>
               <ReferenceLine y={50} label="Median" stroke="#FFD54F"/>
               <Line type="monotone" dataKey="Percentile" stroke="#4DB6AC" />
            </LineChart>
          </ResponsiveContainer>
        </div>);
  }
}

export default StudentCompletionTimePercentileChart;
