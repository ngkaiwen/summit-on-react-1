import React, { Component } from 'react';
import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer,Legend } from "recharts";

class TimeBreakDownComparisonChart extends Component {
  render() {
    const pieData = this.props.pieData /*array*/
    console.log(pieData);
    if (pieData["comparisonChart"] == null) { return (null); }
    const colors = ["#AED581","#F06292"]

    return (
      <div className = "chart">
      <ResponsiveContainer width="100%" height = {200}>
      <PieChart>
      <Legend verticalAlign="bottom" height={15}/>
      <Pie data = {pieData["comparisonChart"]}
      dataKey="Value"
      nameKey="Name"
      innerRadius={40}
      outerRadius={80}
      paddingAngle = {1}>
      { pieData["comparisonChart"].map( (entry,index) => (<Cell fill = {colors[index]} key = {index}/>)) }
      </Pie>
      <Tooltip/>
      </PieChart>
      </ResponsiveContainer>
      </div>
    );
    }
  }

  export default TimeBreakDownComparisonChart;
