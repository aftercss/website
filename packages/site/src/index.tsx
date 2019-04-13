import * as moment from 'moment';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Editor, Layout } from './components';

// with this.
// antd will be happy.
// antd should go to hell.
const d = moment.duration();

ReactDOM.render(
  <Layout>
    <Editor language="css" />
  </Layout>,
  document.querySelector('#root'),
);
