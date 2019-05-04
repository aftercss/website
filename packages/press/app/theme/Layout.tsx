import * as React from 'react';
import { Link } from 'react-router-dom';


export default class Layout extends React.Component<any> {
  public render() {
    return (
      <div>
        <Link to="/user/ttt">user.ttt</Link>
        {this.props.children}
      </div>
    );
  }
}