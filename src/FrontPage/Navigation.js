import React from 'react';
import { Link } from 'react-scroll';

//this component is the navigation for the landing page
const navigation = (props) => {
  return (<nav className="frontPage-nav">
            <ul className="frontPage-ul">
              <Link to="about" spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive}>
                <li className="frontPage-li">About</li>
              </Link>

              <Link to="services" spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive}>
                <li className="frontPage-li">Data</li>
              </Link>

              <Link to="login" spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive}>
                <li className="frontPage-login">Log-in</li>
              </Link>

              <Link to="docs" spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive}>
                <li className="frontPage-li">Docs</li>
              </Link>

              <Link to="docs" spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive}>
                <li className="frontPage-li">Contact</li>
              </Link>
            </ul>
          </nav>);
};

export default navigation;
