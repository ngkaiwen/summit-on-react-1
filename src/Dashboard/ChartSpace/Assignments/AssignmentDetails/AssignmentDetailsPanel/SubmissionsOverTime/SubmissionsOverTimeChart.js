
import React, { Component } from 'react';
import { AreaChart,XAxis,YAxis,Tooltip,ResponsiveContainer,Legend,CartesianGrid,Area } from "recharts";

class SubmissionsOverTimeChart extends Component {

  render() {
    const chartData = this.props.chartData["data"]

    return (
        <div className = "chart">
            <ResponsiveContainer width="100%" height = {210}>
              <AreaChart data={chartData} margin={{top: 5, right: 45, bottom: 0}}>

                <defs>
                  <linearGradient id="completed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#AED581" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#AED581" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="average" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD54F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFD54F" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <XAxis dataKey="Label" tick = {false}/>
                <YAxis/>

                <Tooltip />
                <Legend align = "center" verticalAlign = "top" height={40}/>
                <Area type="monotone" dataKey="Completed assignments" stroke="#AED581" fillOpacity={10} fill="url(#completed)" dot={false}/>
                <Area type="monotone" dataKey="Course average" stroke="#FFD54F" fillOpacity={10} fill="url(#average)" dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
        </div>);
  }
}

export default SubmissionsOverTimeChart;
