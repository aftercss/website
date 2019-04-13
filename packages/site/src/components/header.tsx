import * as React from 'react';
import icon from '../images/header.png';
import './header.css';

export class Header extends React.Component {
  public render() {
    return (
      <header>
        <img className="icon" src={icon} alt="aftercss-icon" />
        <nav>
          <a className="nav-item" href="https://github.com/aftercss/aftercss">
            github
          </a>
        </nav>
      </header>
    );
	}
}
