import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label} from 'recharts';

const SubmissionsRateChart = (props) => {
    //console.log(props.selectedData)
      return ( props.selectedData ?
        <div>
          <h4 className="assignments-title">Submissions Rate </h4>        <ResponsiveContainer width="100%" height = {400}>
            <LineChart width={800} height={300} data={props.selectedData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                <XAxis dataKey="Date">
                    <Label value="Time" offset={0} position="bottom" />
                </ XAxis>
                <YAxis>
                    <Label value="Submissions" offset={0} position="left" angle={-90}/>
                </ YAxis>
                <Tooltip/>
                <Line type="monotone" dataKey="Students" stroke="#82ca9d" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
        </div> : null
    );
};

export default SubmissionsRateChart;
