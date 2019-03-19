import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Editor, Layout } from './components';


ReactDOM.render(
  <Layout>
    <Editor language="css" />
  </Layout>,
  document.querySelector('#root'),
);
