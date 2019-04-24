import React, { Component, Fragment } from 'react';
import {CssBaseline} from '@material-ui/core';

import {Routes} from '../routes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Routes/>
      </Fragment>
    );
  }
}

export default App;
