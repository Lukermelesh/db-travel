import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { TripsView } from '../trips-view';
import * as routes from '../../constants/routes';
import { View } from '../view';
import TripForm from '../trip-form/trip-form';
import CreateUserForm from '../create-user-form/create-user-form';
import { ApartmentForm } from '../apartment-form';
import FormView from '../form-view/form-view';
import { SignupForm } from '../../components/signup-form';

const Routes = () => (
  <Router>
    <Route
      path={routes.MY_TRIPS_ROUTE}
      exact
      render={props => (
        <View active={routes.MY_TRIPS_ROUTE}>
          <TripsView {...props} />
        </View>
      )}
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
    <Route
      path={routes.ADD_APARTMENT_ROUTE}
      exact
      render={props => (
        <View active={routes.ADD_APARTMENT_ROUTE}>
          <ApartmentForm {...props} />
        </View>
      )}
    />
    <Route
      path={routes.CREATE_USER_ROUTE}
      exact
      render={props => (
        <View active={routes.CREATE_USER_ROUTE}>
          <CreateUserForm {...props} />
        </View>
      )}
    />
    <Route
      path={routes.SIGNUP_ROUTE}
      exact
      render={props => (
        <View hideLogin>
          <FormView Form={SignupForm} {...props} />
        </View>
      )}
    />
    <Route
      path={`${routes.EDIT_TRIP_ROUTE}/:tripId`}
      render={props => (
        <View active={routes.ALL_TRIPS_ROUTE}>
          <TripForm {...props} />
        </View>
      )}
    />
  </Router>
);

export default Routes;
