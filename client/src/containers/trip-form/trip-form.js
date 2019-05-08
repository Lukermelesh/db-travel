import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import { connect } from 'react-redux';
import { createTrip } from '../../actions/create-trip';
import { fetchUserList } from '../../actions/fetch-user-list';
import Select from 'react-select';
import { InlineDatePicker } from 'material-ui-pickers';
import { fetchLocationList } from '../../actions/fetch-location-list';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const TripForm = ({
  classes,
  createTrip,
  fetchUserList,
  fetchLocationList,
  history
}) => {
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [travellerDetails, setTravellerDetails] = useState([]);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  const [departureDate, handleDepartureDateChange] = useState(new Date());
  const [returnDate, handleReturnDateChange] = useState(new Date());

  useEffect(() => {
    const fetchUserSuggestions = async () => {
      const userList = await fetchUserList();
      setUserSuggestions(
        userList.map(user => ({ label: user.name, value: user.id }))
      );
    };

    const fetchLocationSuggestions = async () => {
      const locationList = await fetchLocationList();
      setLocationSuggestions(
        locationList.map(location => ({
          label: location,
          value: location
        }))
      );
    };

    fetchUserSuggestions();
    fetchLocationSuggestions();
  }, []);

  const handleCreateTrip = () => createTrip();
  const handleCancel = () => history.goBack();
  const handleAddTraveller = () =>
    setTravellerDetails([...travellerDetails, selectedUser]);

  const renderTravellers = () => (
    <List>
      {travellerDetails.map(traveller => (
        <ListItem key={traveller.id}>
          <Typography>{traveller.label}</Typography>
        </ListItem>
      ))}
    </List>
  );

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Fragment>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                General Info
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                onChange={setOrigin}
                options={locationSuggestions}
                placeholder="Origin"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                onChange={setDestination}
                options={locationSuggestions.filter(
                  s => s.value !== origin.value
                )}
                placeholder="Destination"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InlineDatePicker
                disablePast
                label="From"
                value={departureDate}
                onChange={handleDepartureDateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InlineDatePicker
                minDate={departureDate}
                label="Until"
                value={returnDate}
                onChange={handleReturnDateChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Traveller Details
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Select
                onChange={setSelectedUser}
                options={userSuggestions}
                placeholder="Travellers"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTraveller}
              >
                Add
              </Button>
            </Grid>
            {renderTravellers()}
          </Grid>
          <div className={classes.buttons}>
            <Button className={classes.button} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleCreateTrip}
            >
              Create Trip
            </Button>
          </div>
        </Fragment>
      </Paper>
    </main>
  );
};

TripForm.propTypes = {
  classes: PropTypes.object.isRequired,
  createTrip: PropTypes.func.isRequired,
  fetchUserList: PropTypes.func.isRequired,
  fetchLocationList: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createTrip,
  fetchUserList,
  fetchLocationList
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(TripForm));
