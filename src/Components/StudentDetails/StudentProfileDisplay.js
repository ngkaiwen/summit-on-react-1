import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import "./StudentDetails.css";

class StudentProfileDisplay extends Component {

  render() {
  	const data = this.props.selectedStudentData
    if (Object.keys(data).length > 0){
	    return (
	   	  <div className="student-profile-display">
	      	<Avatar src={data["profile"]["photoURL"]} style= {{height:150, width:150}}/> <br/>
	      	{data["profile"]["displayName"]}
	      </div>
	    );
	}
	else{ return (null); }
  }
}

export default StudentProfileDisplay;
