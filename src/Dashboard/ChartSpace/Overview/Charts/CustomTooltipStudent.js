import React from 'react';

const CustomTooltipStudent = (props) => {
    let payload = null;
    if (props.active) {
        payload  = props.payload;
        return (
            <div className='custom-tooltip'>
            <p className='desc'> <b>{payload[0].payload.name}</b></p>
            <p className='desc'>Completion Rate: <b>{(payload[0].payload.CompletionRate*100).toFixed(2)}%</b></p>
            <p className='desc'>Average Time: <b>{payload[1].payload.assignmentAvgTime} Seconds</b></p>
            </div>
        );
    }
    return null;
}

export default CustomTooltipStudent;