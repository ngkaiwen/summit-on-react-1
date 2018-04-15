import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {firebaseHandle} from '../Config/firebaseAPI';

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  userChangeHandler = (event) => {
   let value = event.target.value;
    this.setState({
      ...this.state,
      username: value
    })
  }

  passChangeHandler = (event) => {
    let value = event.target.value;
    this.setState({
      ...this.state,
      password: value
    })
  }

  submitHandler = () => {
    let uname = this.state.username;
    let pass = this.state.password;
    const auth = firebaseHandle.auth();

    const promise = auth.signInWithEmailAndPassword(uname,pass);
    promise
      .then(user => {
        this.loadData(user);
      })
      .catch(e => window.alert(e.message));
  }

  loadData = (user) => {
    const dataLocation = "courses/";
    this.props.authOn();
    this.props.setUser(user);
    var firebaseStudentsDataset = firebaseHandle.database().ref(dataLocation);
    firebaseStudentsDataset.on("value", Snapshot => {
      this.props.setData(Snapshot.val()); //Store data in Redux store
      this.props.setCourse("-L5cmwU2yj2HRmfDvIUP");
      console.log('firebase mounted');
      this.props.filterData();
    });
  };

  render() {
    return (<div className='login-container'>
              <div className='login-box'>
                <h1>SUMMIT</h1>
                <h3>LOG-IN</h3>
                <br></br>
                <input value={this.state.username} placeholder='Username' className='login-input' onChange={this.userChangeHandler}></input>
                <input value={this.state.password} type='password' placeholder='Password' className='login-input' onChange={this.passChangeHandler}></input>
                <button className='login-button' onClick={this.submitHandler} >Submit</button>
                {this.props.auth ?  <Redirect to="/dashboard"/> : null}
              </div>
            </div>);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authOn : () => dispatch({type:"ON_AUTH",payload:true}),
    setUser: (user) => dispatch({type:"SET_USER", payload:user}),
    filterData: () => dispatch({type:"FILTER_DATA"}),
    setData: (data) => dispatch({type:"SET_DATA", payload:data}),
    setCourse: (course) => dispatch({type:"SET_SELECTED_COURSE", payload:course})
  };
};

function mapStateToProps(state){
  return {
    auth: state["auth"],
    store: state["all_raw_data"],
    selCourse: state["selected_course"]
  }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
