import React, { Component } from 'react';
import './App.css';
import FrontPage from './Containers/FrontPage';
import Dashboard from './Containers/Dashboard';
import { BrowserRouter,Route } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' exact component={FrontPage} />
          <Route path='/dashboard' exact component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
