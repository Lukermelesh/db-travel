import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {TripsView} from '../trips-view';
import * as routes from '../../constants/routes';
import {View} from '../view';

const Routes = () => <Router>
  <Route path={routes.MY_TRIPS_ROUTE} exact render={(props) => <View active={routes.MY_TRIPS_ROUTE}><TripsView {...props}/></View>} />
  {/*TODO: Make AllTripsView*/}
  <Route path={routes.ALL_TRIPS_ROUTE} exact render={(props) => <View active={routes.ALL_TRIPS_ROUTE}><TripsView {...props}/></View>} />
</Router>;

export default Routes;