import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const barChart = (props) => {

    return (
        <ResponsiveContainer width="100%" height="90%">
            <BarChart data={props.data}
                    margin={{top: 20, right: 10, left: 10, bottom: 20}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" label={{value: "Week", offset: 0, position: "bottom"}}/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="Assignments" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );

};

export default barChart;

