import * as React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

import { INav } from '../../index';

export interface INavProps {
  data: INav[];
}

export default class Nav extends React.Component<INavProps> {
  public renderItem(nav: INav) {
    return (
      <div key={nav.path}>
        <Link className="after-nav-article" smooth to={nav.path}>
          {nav.title}
        </Link>
        {nav.headers.map(header => (
          <Link className="after-nav-section" smooth to={`${nav.path}#${header.id}`} key={`${nav.path}#${header.id}`}>
            {header.title}
          </Link>
        ))}
      </div>
    );
  }
  public render() {
    return <div>{this.props.data.map(nav => this.renderItem(nav))}</div>;
  }
}

// tslint:disable
const styles = theme => ({
  title: {
    font: {
      size: 40,
      weight: 900
    },
    color: theme.color
  },
  wrapper: {
    background: theme.background,
    padding: 40,
    textAlign: "left"
  },
 
  link: {
    color: theme.color,
    "&:hover": {
      opacity: 0.5
    }
  }
});