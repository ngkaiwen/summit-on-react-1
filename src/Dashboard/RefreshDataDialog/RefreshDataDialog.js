import React, { Component } from 'react';
import Dialog, { DialogTitle,DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import RefreshDataMain from "./RefreshDataDialogComponents/RefreshDataMain.js"
import "./RefreshDataDialogComponents/RefreshDataDialog.css"

class RefreshDataDialog extends Component {

	state = {
		dataUpdateTimer:0,
		dataUpdatePercentage:0,
		dataIsRefreshing:false,
		howLongToRefreshInSeconds:45 //Hard-coded refresh timer, in seconds
	}

	dialogCloseHandler = () => {
		this.props.dialogDisplayToggle();
	}

	toggleDataIsRefreshing = () => { //Handles a refresh button press from the RefreshDataMain component
		this.setState({dataIsRefreshing:(this.state.dataIsRefreshing ? false : true)})
	}

	startTimer = () => { //Handles the initialisation of the countdown timer after the referesh button is pressed
		const howOftenToUpdateProgressSpinner = 20; //In milliseconds
		const timerIncrementStep = howOftenToUpdateProgressSpinner/1000; //How much to increment the timer per step
		this.setState({dataUpdateTimer:this.state.howLongToRefreshInSeconds}) //Initialise timer to the necessary time

		this.timer = setInterval( () => {
			var dataUpdatePercentage = (this.state.howLongToRefreshInSeconds - this.state.dataUpdateTimer)/this.state.howLongToRefreshInSeconds*100
			this.setState(
				{dataUpdateTimer:this.state.dataUpdateTimer-timerIncrementStep,
					dataUpdatePercentage:dataUpdatePercentage})}, 
				howOftenToUpdateProgressSpinner) //Decrements dataUpdateTimer by the step determined above
	}

	componentWillUpdate() { 
		if(this.state.dataUpdateTimer<0) {
			clearInterval(this.timer); //Stop the timer
			this.toggleDataIsRefreshing() //Replace progress spinner with button and last updated timing
			this.setState({dataUpdateTimer:0})
		}
	}  

  render() {

		return (
	   	  <Dialog open = {this.props.open}
	   	  	onEscapeKeyDown = {() => this.props.dialogDisplayToggle()}
	   	  	className = "refresh-data-dialog">

	   	  	<DialogTitle>Refresh application data</DialogTitle>

	   	  	<RefreshDataMain 
            dataIsRefreshing = {this.state.dataIsRefreshing}
            dataUpdateTimer = {this.state.dataUpdateTimer}
            dataUpdatePercentage = {this.state.dataUpdatePercentage}
            lastUpdated = {this.props.lastUpdatedDatetime}
            toggleDataIsRefreshing = {this.toggleDataIsRefreshing}
            startTimer = {this.startTimer}/>

          <DialogActions>
            <Button
              variant = "raised" 
              color = "primary"
              onClick = {() => this.dialogCloseHandler()}
              children = "Close"/>
          </DialogActions>
	      </Dialog>
	    );
  }
}

function mapStateToProps(state){
  var lastUpdatedDatetime = state["last_updated_datetime"]
  return { lastUpdatedDatetime:lastUpdatedDatetime }
}

export default connect(mapStateToProps)(RefreshDataDialog);
