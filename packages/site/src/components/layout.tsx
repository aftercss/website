import * as React from 'react';

import { Header } from './header';
import './layout.css';

export class Layout extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <footer>
          &copy; {new Date().getFullYear()}
          <a href="https://github.com/aftercss/aftercss">&nbsp;aftercss</a>
        </footer>
      </div>
    );
  }
}
