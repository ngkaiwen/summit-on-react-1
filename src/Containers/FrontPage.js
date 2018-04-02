import React, { Component } from 'react';
import Navigation from '../Components/Navigation';
import Login from '../Components/Login';
import About from '../Components/About';

class frontPage extends Component {

  render() {
    return (
    <div>
      <header className="cover-page">
        <div className="cover-logo-container">
          <div className="cover-logo">
            <h1>SUMMIT</h1>
            <h3>ANALYTICS</h3>
          </div>
        </div>
        <div>
          <Navigation clicked={this.handleScrollToElement}/>
        </div>
      </header>
      <main>
        <About />
        <div id='login'><Login /></div>
      </main>
    </div>
    );
  }
}

export default frontPage;
