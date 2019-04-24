import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {TripsView} from '../trips-view';
import * as routes from '../../constants/routes';

const Routes = () => <Router>
  <Route path={routes.MY_TRIPS_ROUTE} exact component={TripsView} />
  <Route path={routes.ALL_TRIPS_ROUTE} exact component={TripsView} />
</Router>;

export default Routes;