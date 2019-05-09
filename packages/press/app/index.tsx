import Layout from '@theme/Layout';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HashRouter, Route, Switch } from 'react-router-dom';
import MDComponents from './.temp/md-comps';

export interface INav {
  headers: IHeader[];
  path: string;
  title: string;
}
export interface IHeader {
  id: string;
  level: string;
  title: string;
}

class App extends React.Component {
  public getNavData() {
    const navData: INav[] = [];
    MDComponents.forEach(item => {
      navData.push({
        headers: item.getHeaders(),
        path: item.path,
        title: item.getTitle(),
      });
    });
    return navData;
  }
  public render() {
    return (
      <HashRouter>
        <Layout navData={this.getNavData()}>
          <Switch>
            {MDComponents.map(md => (
              <Route
                exact
                path={md.path}
                key={md.path}
                render={() => {
                  return <md.comp />;
                }}
              />
            ))}
          </Switch>
        </Layout>
      </HashRouter>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('#root'));
