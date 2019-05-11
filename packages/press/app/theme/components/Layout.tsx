import * as React from 'react';
import { INav } from '../../index';
import Nav from './Nav';

export interface ILayoutProps {
  navData: INav[];
}
export default class Layout extends React.Component<ILayoutProps> {
  public render() {
    return (
      <div>
        {this.props.children}
        <Nav data={this.props.navData} />
      </div>
    );
  }
}
