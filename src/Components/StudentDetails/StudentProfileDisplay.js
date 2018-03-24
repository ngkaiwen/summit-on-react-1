import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import "./StudentDetails.css";

class StudentProfileDisplay extends Component {

  render() {
  	const data = this.props.selectedStudentData
    if (data !== null){
	    return (
	   	  <div className="student-profile-display">
	      	<Avatar src={data["photoURL"]} style= {{height:150, width:150}}/> <br/>
	      	{data["displayName"]}
	      </div>
	    );
	}
	else{ return (null); }
  }
}

export default StudentProfileDisplay;
