import React, { Component } from 'react';
import Overview from './Charts/Overview';
import Students from './Charts/Students';
import StudentDetailsPage from "./StudentDetailsPage.js";
import {firebaseHandle} from "../Config/firebaseAPI.js";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MainAppReducer from "../Redux/AppReducer.js";

let store = createStore(MainAppReducer)

class chartSpace extends Component {

  constructor(){
    super();
    this.state = { // Initialise
      selectedModule : "-L5cmwU2yj2HRmfDvIUP" //Temporarily hardcode the BT3103 module as the selected module - to change after module selector is implemented
    }
  }

  componentWillMount(){
    const dataLocation = "courses/";
    var firebaseStudentsDataset = firebaseHandle.database().ref(dataLocation);
    firebaseStudentsDataset.on("value",Snapshot => store.dispatch( {type:"SET_DATA",payload:Snapshot.val()} ));
    store.dispatch({type:"SET_SELECTED_COURSE",payload:"-L5cmwU2yj2HRmfDvIUP"}) //Set course to BT3103 as default
  }

  render() {
    //Renders or does not render a particular chart depending on which page was selected in the toolbar
    let ovw = (this.props.type === 'overview') ? <Overview selectedModule = {this.state.selectedModule}/> : null; 
    let stu = (this.props.type === 'students') ? <Students selectedModule = {this.state.selectedModule}/> : null;
    let stulst = (this.props.type === 'studentsList') ? <StudentDetailsPage selectedModule = {this.state.selectedModule}/> : null;

    return (
      <Provider store = {store}> 
        <div>
          {ovw}
          {stu}
          {stulst}
        </div>
      </Provider>
    );
  }
}

export default chartSpace;
