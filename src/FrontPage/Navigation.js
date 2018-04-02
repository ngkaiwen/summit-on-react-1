import React from 'react';
import { Link } from 'react-scroll';


const navigation = (props) => {
  return (<nav className="frontPage-nav">
            <ul className="frontPage-ul">
              <Link to="about" spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive}>
                <li className="frontPage-li">About</li>
              </Link>

              <Link to="services" spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive}>
                <li className="frontPage-li">Services</li>
              </Link>

              <Link to="login" spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive}>
                <li className="frontPage-login">Log-in</li>
              </Link>

              <li className="frontPage-li">Pricing</li>
              <li className="frontPage-li">Contact</li>
            </ul>
          </nav>);
};

export default navigation;
