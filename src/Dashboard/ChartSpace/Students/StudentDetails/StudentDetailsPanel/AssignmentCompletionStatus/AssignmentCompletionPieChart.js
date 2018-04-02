import React, { Component } from 'react';
import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer,Legend } from "recharts";

class StudentCompletionTimeChart extends Component {

  render() {
    const pieData = this.props.pieData["data"]
    const colors = ["#AED581","#F06292"]
    return (
        <div className = "chart">
            <ResponsiveContainer width="100%" height = {200}>
              <PieChart>
                <Legend verticalAlign="top" height={15}/>
                <Pie data = {pieData} 
                  dataKey="Value" 
                  nameKey="Name" 
                  innerRadius={1} 
                  outerRadius={80} 
                  paddingAngle = {1}>
                  { pieData.map( (entry,index) => (<Cell fill = {colors[index]} key = {index}/>)) }
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
        </div>);
  }
}

export default StudentCompletionTimeChart;
