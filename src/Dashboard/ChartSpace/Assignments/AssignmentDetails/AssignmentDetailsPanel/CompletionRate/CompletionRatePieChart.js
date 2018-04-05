import React, { Component } from 'react';
import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer,Legend } from "recharts";

class CompletionRatePieChart  extends Component {

  render() {
    const pieData2 = this.props.pieData2["data"]
    const colors = ["#AED581","#F06292"]
    return (
          <div className = "chart">
              <ResponsiveContainer width="100%" height = {200}>
                <PieChart>
                  <Legend verticalAlign="top" height={15}/>
                  <Pie data = {pieData2}
                    dataKey="Value"
                    nameKey="Name"
                    innerRadius={1}
                    outerRadius={80}
                    paddingAngle = {1}>
                    { pieData2.map( (entry,index) => (<Cell fill = {colors[index]} key = {index}/>)) }
                  </Pie>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
          </div>);
    }
  }
export default CompletionRatePieChart;
