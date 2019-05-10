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
import Collapse from '@material-ui/core/Collapse/Collapse';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { Divider } from '@material-ui/core';
import Links from '../../components/links/links';
import IconButton from '@material-ui/core/IconButton/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { UploadButton } from '../../components/upload-button';
import { ExpandMoreButton } from '../../components/expand-more-button';
import { uniqBy, flow } from 'lodash';

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
  },
  nested: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'lavender'
  },
  divider: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  nestedHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rotatedIcon: {
    transform: 'rotate(180deg)'
  },
  iconButton: {
    padding: theme.spacing.unit
  },
  icon: {
    transition: 'transform 200ms'
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
  const [selectedUser, setSelectedUser] = useState();
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
    selectedUser &&
    // TODO: maybe show error when trying to add same user twice
    !travellerDetails.find(t => t.value === selectedUser.value) &&
    setTravellerDetails([
      ...travellerDetails,
      { ...selectedUser, isOpen: false, tickets: [], accommodation: {} }
    ]);
  const handleDeleteTraveller = userId => () => {
    debugger;
    console.log('SIEMKA!');
    setTravellerDetails(travellerDetails.filter(t => t.value !== userId));
  };

  const handleTravellerClick = id => () =>
    setTravellerDetails(
      travellerDetails.map(t =>
        t.value === id ? { ...t, isOpen: !t.isOpen } : t
      )
    );

  // TODO: SHOW ERROR WHEN TRYING TO UPLOAD FILE WITH THE SAME NAME
  // TODO: OR CHANGE THE NAME WHEN ADDING A FILE WITH DUPLICATE NAME
  const setTickets = (userId, tickets, replace) => {
    setTravellerDetails(
      travellerDetails.map(t =>
        t.value === userId
          ? {
              ...t,
              tickets: replace
                ? tickets
                : uniqBy([...t.tickets, ...tickets], 'name')
            }
          : t
      )
    );
  };
  const handleTicketUpload = userId => ({ target }) => {
    //TODO: Don't forget to remove window.a!
    window.a = target.files;
    setTickets(userId, Array.from(target.files));
  };
  const handleTicketDelete = userId => ({ title }) => {
    const tickets = travellerDetails.find(t => t.value === userId).tickets;
    setTickets(userId, tickets.filter(t => t.name !== title), true);
  };

  const getFileLinks = files => files.map(t => ({ title: t.name }));

  const renderTravellers = () => (
    <List>
      {travellerDetails.map(
        ({ value: userId, label, isOpen, tickets, accommodation }) => (
          <Fragment key={userId}>
            <ListItem divider>
              <ListItemText primary={label} />
              <IconButton onClick={handleDeleteTraveller(userId)}>
                <RemoveCircle />
              </IconButton>
              <ExpandMoreButton onClick={handleTravellerClick(userId)} isOpen={isOpen}/>
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <div className={classes.nested}>
                <div className={classes.nestedHeader}>
                  <Typography variant="h6" component="p">
                    Tickets
                  </Typography>
                  <UploadButton
                    id={`traveller-${userId}-ticket`}
                    onFileUpload={handleTicketUpload(userId)}
                  />
                </div>
                <Links
                  allowDelete
                  links={getFileLinks(tickets)}
                  onDeleteClick={handleTicketDelete(userId)}
                />
                <Divider className={classes.divider} />
                <div className={classes.nestedHeader}>
                  <Typography variant="h6" component="p">
                    Accommodation
                  </Typography>
                  {/*TODO: add accommodation screen/modal/whatever!*/}
                  <IconButton component="span">
                    <AddCircle />
                  </IconButton>
                </div>
                <Typography component="p">{accommodation.location}</Typography>
                {accommodation.files && (
                  <Fragment>
                    <Divider className={classes.divider} />
                    <Typography variant="h6" component="p">
                      Reservation
                    </Typography>
                    <Links
                      allowDelete
                      links={getFileLinks(accommodation.files)}
                    />
                  </Fragment>
                )}
              </div>
            </Collapse>
          </Fragment>
        )
      )}
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
            <Grid item xs={12}>
              {renderTravellers()}
            </Grid>
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

export default flow(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(TripForm);
