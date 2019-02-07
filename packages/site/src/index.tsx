import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './components';

ReactDOM.render(<Header p="test-props-works-fine" />, document.querySelector('#root'));
