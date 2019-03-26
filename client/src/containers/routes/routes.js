import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TripsView from "../trips-view";

const Routes = () => <Router>
  <Route path="/" exact component={TripsView} />
</Router>;

export default Routes;