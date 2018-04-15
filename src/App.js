import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import MainAppReducer from './Redux/AppReducer';
import { Provider } from 'react-redux';

import FrontPage from './FrontPage/FrontPage';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter,Route } from 'react-router-dom';
import { firebaseHandle } from './Config/firebaseAPI';

let store = createStore(MainAppReducer)

class App extends Component {
  
  // componentDidMount(){
  //   const dataLocation = "courses/";
  //   var firebaseStudentsDataset = firebaseHandle.database().ref(dataLocation);
  //   firebaseStudentsDataset.on("value",Snapshot => store.dispatch( {type:"SET_DATA",payload:Snapshot.val()} )); //Store data in Redux store
  //   store.dispatch({type:"SET_SELECTED_COURSE",payload:"-L5cmwU2yj2HRmfDvIUP"}) //Set course to BT3103 as default in redux store
  //   console.log('firebase mounted');
  // }

  fbOutHandler = () => {
    store.dispatch( {type:"OFF_AUTH"});
    firebaseHandle.auth().signOut();
  }

  render() {
    return (
      <Provider store = {store}> 
      <BrowserRouter>
        <div className="App">
          <Route path='/' exact component={FrontPage} />
          <Route path='/dashboard' exact render={() => <Dashboard logOut={this.fbOutHandler}/>} />
        </div>
      </BrowserRouter>
      </Provider>  
    );
  }
}

export default App;
