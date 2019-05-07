import React, { Component, Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Routes } from '../routes';
import { Provider } from 'react-redux';
import reducers from '../../reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

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
