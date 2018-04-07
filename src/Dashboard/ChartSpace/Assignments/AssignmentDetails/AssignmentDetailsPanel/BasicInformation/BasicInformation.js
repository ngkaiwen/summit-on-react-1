import React, { Component } from 'react';

class BasicInformation extends Component {

  render() {
    //console.log(this.props.selectedAssignmentData)
    const data = this.props.selectedAssignmentData
    const name = data["name"]
    const questionType = data["questionType"]
    //const details = data["details"]
    //const open = data["open"]
    //const deadline = data["deadline"]
    const visible = data["visible"]
    //console.log(deadline)
		return (
  <div>
      <div className = "pane-title">
      Key Details
			</div>
          <div className="basic-information">
	      	Assignment Name : {name} <br/>
          </div>
          <div className="basic-information">
          Visibility: {visible} <br/>
        </div>
          <div className="basic-information">
            QuestionType : {questionType} <br/>
          </div>
        </div>
	    );
  }
}

export default BasicInformation;
