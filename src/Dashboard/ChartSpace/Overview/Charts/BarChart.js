import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const barChart = (props) => {

    return (
        <ResponsiveContainer width="100%" height="90%">
            <BarChart data={props.data}
                    margin={{top: 20, right: 10, left: 10, bottom: 10}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="assignments" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );

};

export default barChart;

