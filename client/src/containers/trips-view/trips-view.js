import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getTrips } from '../../helpers/data-fetchers';
import { TripCard } from '../../components/trip-card';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

const TripsView = ({ classes }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //TODO: don't hardcode userId!
      const result = await getTrips('1');

      setTrips(result.data);
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

export default withStyles(styles)(TripsView);
