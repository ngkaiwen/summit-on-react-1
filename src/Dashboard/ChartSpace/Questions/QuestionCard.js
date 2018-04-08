import React from 'react';

const questionCard = (props) => {
    //console.log(props.time)
  return(<div className="QuestionCard">
            <h2>{props.from}</h2>
            <h2>{props.time}</h2>
            <br />
            <h1>{props.msg}</h1>
        </div>)
}

export default questionCard;
