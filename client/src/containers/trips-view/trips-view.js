import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import Fab from '@material-ui/core/Fab/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TripCard } from '../../components/trip-card';
import { fetchUserTrips } from '../../actions/fetch-user-trips';
import { getUserId, getUserType } from '../../selectors/user-data';
import { getOwnTrips } from '../../selectors/trips';
import { fetchAllTrips } from '../../actions/fetch-all-trips';
import { NEW_TRIP_ROUTE } from '../../constants/routes';
import { ORGANIZER } from '../../constants/user-types';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  }
});

const TripsView = ({
  classes,
  fetchUserTrips,
  trips,
  userId,
  allTrips,
  fetchAllTrips,
  userType
}) => {
  useEffect(() => {
    const fetchData = async () => {
      //TODO: maybe implement a loader while loading trips?
      allTrips ? await fetchAllTrips() : await fetchUserTrips(userId);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.layout}>
      <Grid container spacing={24}>
        {trips.map(trip => (
          <Grid key={trip.id} item xs={12} sm={12} md={4} lg={3}>
            <TripCard trip={trip} />
          </Grid>
        ))}
        {userType === ORGANIZER && (
          <Link to={NEW_TRIP_ROUTE}>
            <Fab className={classes.fab} color="primary" aria-label="Add">
              <AddIcon />
            </Fab>
          </Link>
        )}
      </Grid>
    </div>
  );
};

TripsView.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchUserTrips: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  allTrips: PropTypes.bool,
  userType: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  trips: ownProps.allTrips ? state.trips : getOwnTrips(state),
  userId: getUserId(state),
  userType: getUserType(state)
});

const mapDispatchToProps = {
  fetchUserTrips,
  fetchAllTrips
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TripsView));
