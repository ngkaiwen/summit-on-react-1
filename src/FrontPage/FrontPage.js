import React, { Component } from 'react';
import Navigation from './Navigation';
import Login from './Login';
import About from './About';
import About1 from './About.1';

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
        <About1 />
      </main>
    </div>
    );
  }
}

export default frontPage;
