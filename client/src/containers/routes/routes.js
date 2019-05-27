import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { TripsView } from '../trips-view';
import * as routes from '../../constants/routes';
import { View } from '../view';
import TripForm from '../trip-form/trip-form';
import { LoginView } from '../login-view';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../selectors/user-data';

const Routes = ({ isLoggedIn }) => (
  <Router>
    <Route
      path={routes.MY_TRIPS_ROUTE}
      exact
      render={props =>
        isLoggedIn ? (
          <View active={routes.MY_TRIPS_ROUTE}>
            <TripsView {...props} />
          </View>
        ) : (
          <LoginView />
        )
      }
    />
    <Route
      path={routes.ALL_TRIPS_ROUTE}
      exact
      render={props => (
        <View active={routes.ALL_TRIPS_ROUTE}>
          <TripsView allTrips {...props} />
        </View>
      )}
    />
    <Route
      path={routes.NEW_TRIP_ROUTE}
      exact
      render={props => (
        <View active={routes.ALL_TRIPS_ROUTE}>
          <TripForm isNew {...props} />
        </View>
      )}
    />
  </Router>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state)
});

export default connect(mapStateToProps)(Routes);
