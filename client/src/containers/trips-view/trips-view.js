import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import Fab from '@material-ui/core/Fab/Fab';
import AddIcon from '@material-ui/icons/Add';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TripCard } from '../../components/trip-card';
import { fetchUserTrips } from '../../actions/fetch-user-trips';
import { getUserType } from '../../selectors/user-data';
import { getOwnTrips } from '../../selectors/trips';
import { fetchAllTrips } from '../../actions/fetch-all-trips';
import { NEW_TRIP_ROUTE } from '../../constants/routes';
import { ADMIN, ORGANIZER } from '../../constants/user-types';
import { mergeTrips } from '../../actions/merge-trips';

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
  },
  fab1: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 16
  }
});

const TripsView = ({
  classes,
  fetchUserTrips,
  trips,
  allTrips,
  fetchAllTrips,
  userType,
  showActions,
  mergeTrips
}) => {
  const [isMerging, setIsMerging] = useState(false);
  const [tripsToMerge, setTripsToMerge] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //TODO: maybe implement a loader while loading trips?
      allTrips ? await fetchAllTrips() : await fetchUserTrips();
    };

    fetchData();
  }, []);

  const handleTripSelect = tripId => setTripsToMerge([...tripsToMerge, tripId]);

  const handleMergeClick = () => {
    if (isMerging && tripsToMerge.length) {
      mergeTrips(tripsToMerge).then();
    }
    setTripsToMerge([]);
    setIsMerging(!isMerging);
  };

  return (
    <div className={classes.layout}>
      <Grid container spacing={24}>
        {trips.map(trip => {
          return (
            <Grid key={trip.id} item xs={12} sm={12} md={4} lg={3}>
              <TripCard
                showActions={showActions}
                trip={trip}
                isMerging={isMerging}
                onTripSelect={handleTripSelect}
              />
            </Grid>
          );
        })}
        {(userType === ORGANIZER || userType === ADMIN) && (
          <Fragment>
            <Fab className={classes.fab1} color="primary" aria-label="Merge">
              <CallMergeIcon onClick={handleMergeClick} />
            </Fab>
            <Link to={NEW_TRIP_ROUTE}>
              <Fab className={classes.fab} color="primary" aria-label="Add">
                <AddIcon />
              </Fab>
            </Link>
          </Fragment>
        )}
      </Grid>
    </div>
  );
};

TripsView.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchUserTrips: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired,
  allTrips: PropTypes.bool,
  userType: PropTypes.number.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  trips: ownProps.allTrips ? state.trips.all : getOwnTrips(state),
  userType: getUserType(state)
});

const mapDispatchToProps = {
  fetchUserTrips,
  fetchAllTrips,
  mergeTrips
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TripsView));
