import React, { Component } from 'react';
import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer,Legend } from "recharts";

class TimeBreakDownChart extends Component {
  render() {
    const pieData = this.props.pieData /*array*/
    console.log(pieData);
    if (pieData["ownChart"] == null) { return null }
    const colors = ["#AED581","#F06292"]

    return (
      <div className = "chart">
        <ResponsiveContainer width="100%" height = {200}>
          <PieChart>
            <Legend verticalAlign="bottom" height={15}/>
            <Pie data = {pieData["ownChart"]}
              dataKey="Value"
              nameKey="Name"
              innerRadius={1}
              outerRadius={80}
              paddingAngle = {1}>
              { pieData["ownChart"].map( (entry,index) => (<Cell fill = {colors[index]} key = {index}/>)) }
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>);
    }
  }

  export default TimeBreakDownChart;
