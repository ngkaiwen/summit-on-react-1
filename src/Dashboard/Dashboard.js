import React, { Component } from 'react';
import { createStore } from 'redux';
import MainAppReducer from "../Redux/AppReducer.js";
import { Provider } from 'react-redux';
import {firebaseHandle} from "../Config/firebaseAPI.js";

import Toolbar from './Toolbar';
import ChartSpace from './ChartSpace/ChartSpace';
import CourseSelectionDialog from "./CourseSelectionDialog/CourseSelectionDialog"
import Button from 'material-ui/Button';
import {Settings} from 'material-ui-icons';


let store = createStore(MainAppReducer)

class dashboard extends Component {

  state = {
    displayPage: 'overview',
    displayCourseSelectionDialog: false,
  }

  toolbarClickHandler = (pageID) => {
    this.setState({displayPage: pageID})
  }

  dialogDisplayToggle = () => {
    var bool = (this.state.displayCourseSelectionDialog) ? false : true
    this.setState({displayCourseSelectionDialog:bool})
  }

  componentDidMount(){
    const dataLocation = "courses/";
    var firebaseStudentsDataset = firebaseHandle.database().ref(dataLocation);
    firebaseStudentsDataset.on("value",Snapshot => store.dispatch( {type:"SET_DATA",payload:Snapshot.val()} )); //Store data in Redux store
    store.dispatch({type:"SET_SELECTED_COURSE",payload:"-L5cmwU2yj2HRmfDvIUP"}) //Set course to BT3103 as default in redux store
    console.log('firebase mounted');
  }



  render() {
    return (
      <Provider store = {store}> 
        
        <div className='dashboard'>
          
          <div className='toolbar'> <Toolbar clicked={this.toolbarClickHandler}/> </div>

          <CourseSelectionDialog 
            open = {this.state.displayCourseSelectionDialog}
            dialogDisplayToggle = {this.dialogDisplayToggle}/>
          
          <ChartSpace type={this.state.displayPage}/>

          <div className="courseSelectionDialogShow">
          <Button 
            variant="fab" 
            color="primary" 
            onClick = {this.dialogDisplayToggle}
            children = {<Settings/>} />
          </div>
        </div>

      </Provider>  
    );
  }
}

export default dashboard;
