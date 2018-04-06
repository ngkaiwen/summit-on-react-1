import React from 'react';
import {PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const pieChart = (props) => {

    const colors = ["#8884d8","#82ca9d"];

    let outData = [{name: "Completed" , value: props.data.Completed},
                   {name: "Incompleted" , value: props.data.Uncompleted}];

    return (
    	<PieChart width={300} height={300} style={{margin:"auto"}}>
        <Legend verticalAlign="bottom" height={15}/>
        <Pie data={outData} outerRadius={100} dataKey="value" nameKey="name" label>
        	{outData.map((entry, index) => <Cell fill={colors[index % colors.length]} key = {index}/>)}     
        </Pie>
        <Tooltip/>
       </PieChart>
    );

};

export default pieChart;

