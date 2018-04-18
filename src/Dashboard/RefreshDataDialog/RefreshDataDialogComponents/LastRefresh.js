import React, { Component } from 'react';

class LastRefresh extends Component {
	render() {
		return(
			<div className = "last-refresh">
				Data was last updated at:<br/>
				{this.props.datetime}
			</div>
		)
	}
}

export default LastRefresh;