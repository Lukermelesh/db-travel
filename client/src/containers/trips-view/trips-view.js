import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TripCard } from '../../components/trip-card';
import { fetchUserTrips } from '../../actions/fetch-user-trips';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserId } from '../../selectors/user-data';
import { getOwnTrips } from '../../selectors/trips';
import { fetchAllTrips } from '../../actions/fetch-all-trips';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

const TripsView = ({
  classes,
  fetchUserTrips,
  trips,
  userId,
  allTrips,
  fetchAllTrips
}) => {
  useEffect(() => {
    const fetchData = async () => {
      //TODO: maybe implement a loader while loading trips?
      await allTrips ? fetchAllTrips() : fetchUserTrips(userId);
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
      </Grid>
    </div>
  );
};

TripsView.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchUserTrips: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  allTrips: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  trips: ownProps.allTrips ? state.trips : getOwnTrips(state),
  userId: getUserId(state)
});

const mapDispatchToProps = {
  fetchUserTrips,
  fetchAllTrips
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TripsView));
