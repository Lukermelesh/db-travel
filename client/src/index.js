import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './containers/app';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { get, post } from './helpers/request-helpers';

const initialize = () => {
  window.axios = axios;
  window.get = get;
  window.post = post;
  //TODO: take token from cookie if it's available
};

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined')
  initialize();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
