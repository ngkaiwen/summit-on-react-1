import React, { Component } from 'react';

class CountDown extends Component {
	render() {
		return(
			<div>
			Approximate time left:<br/>
			{this.props.timeLeft} seconds
			</div>
		)
	}
}

export default CountDown;