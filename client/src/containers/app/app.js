import React, { Component, Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Routes } from '../routes';
import { Provider } from 'react-redux';
import reducers from '../../reducers';
import { createStore } from 'redux';

const store = createStore(reducers, {});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <CssBaseline />
          <Routes />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
