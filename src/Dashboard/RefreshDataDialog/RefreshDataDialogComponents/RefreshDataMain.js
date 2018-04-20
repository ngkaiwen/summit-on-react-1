import React, { Component } from 'react';
//import {connect} from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import LastRefresh from "./LastRefresh.js"
import CountDown from "./CountDown.js"
import Button from 'material-ui/Button';
import {Refresh} from 'material-ui-icons';
import Tooltip from 'material-ui/Tooltip';

class RefreshDataMain extends Component {

	refreshDataHandler(){ //Handles requests to refresh the data which are initiated from the button
		this.props.toggleDataIsRefreshing();//Toggle data refresh
		this.props.startTimer(); //Start countdown timer
		const apiAddress = "https://1pj789ht41.execute-api.us-west-2.amazonaws.com/v1/summitUpdate" //AWS lambda API gateway address
		fetch(apiAddress,{ mode: "no-cors" }).then((response) => {}).catch( e => console.log(e) ) //Call the api that updates the firebase
	}

	render() {
		var refreshButton = <div>
			<Tooltip id="tooltip" title="Typically takes 50 seconds">
			<Button
              variant="fab"
              color = "secondary"
              onClick = {() => this.refreshDataHandler()}
              style = {{height:100,width:100}}
              children = {<Refresh/>}/> 
            </Tooltip>
            </div>

        var currentTimer = Math.round(this.props.dataUpdateTimer)

        var progressSpinner = <CircularProgress 
        	size={100} 
        	variant="determinate" 
        	value={this.props.dataUpdatePercentage}/>    
              

		var displayButtonOrSpinner = this.props.dataIsRefreshing ?  progressSpinner : refreshButton
		var displayLastRefreshOrCountdown = this.props.dataIsRefreshing ? <CountDown timeLeft = {currentTimer}/> : <LastRefresh datetime = {this.props.lastUpdated}/> 
		
		return( 
			<div className = "refresh-data-content">
				<div className = "horizontal-span"> {displayLastRefreshOrCountdown} </div>
				<div className = "horizontal-span"> {displayButtonOrSpinner} </div>
			</div> )
	}


}

export default RefreshDataMain;