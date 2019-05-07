import Layout from '@theme/Layout';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MDComponents from './.temp/md-comps';

export interface INav {
  title: string;
  path: string;
  headers: IHeader[];
}
export interface IHeader {
  level: number;
  slug: string;
  title: string;
}

class App extends React.Component {
  public refs: {
    [index: string]: React.Component;
  };
  public getNavData() {
    const navData: INav[] = [];
    MDComponents.forEach(item => {
      // TODO forward refs
      // const title = this[item.comp].title();
      // const headers = this[item.comp].headers();
      const title = '';
      const headers = [];
      navData.push({
        headers,
        path: item.path,
        title,
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
              <Route path={md.path} component={md.comp}  key={md.path}/>
            ))}
          </Switch>
        </Layout>
      </HashRouter>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('#root'));
