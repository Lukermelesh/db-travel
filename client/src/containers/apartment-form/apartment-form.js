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
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { UploadButton } from '../../components/upload-button';
import { ExpandMoreButton } from '../../components/expand-more-button';
import { uniqBy, flow } from 'lodash';
import { fetchApartmentList } from '../../actions/fetch-apartment-list';
import TextField from '@material-ui/core/TextField';
import { createApartment } from '../../actions/create-apartment';

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
  fullWidth: {
    width: '100%'
  },
  centerItem: {
    display: 'flex',
    alignItems: 'center'
  }
});

const ApartmentForm = ({
  classes,
  createApartment,
  history
}) => {
  const [apartmentTitle, setApartmentTitle] = useState();
  const [apartmentAddress, setApartmentAddress] = useState();
  const [RoomsNumbers, setApartmentRoomNumber] = useState([]);

  const handleCreateApartment = () => createApartment();
  const handleCancel = () => history.goBack();

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
            <Grid item xs={12} sm={12}>
              <TextField 
                margin="none"
                label="Title"
                className={classes.textField}
                fullWidth
                onChange={(event) => setApartmentTitle(event.target.value)}          
                variant="outlined"
              />
              </Grid>
              <Grid item xs={12} sm={12}>             
              <TextField
                label="Address"
                className={classes.textField}
                fullWidth
                onChange={(event) => setApartmentAddress(event.target.value)}
                margin="none"
                variant="outlined"
              />
            </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  label="Room Number"
                  className={classes.textField}
                  fullWidth
                  //value={values.name}
                  onChange={(event) => setApartmentRoomNumber(event.target.value)}
                  margin="none"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2} className={classes.centerItem}>
                <Button 
                  variant="contained"
                  color="primary"
                  //onClick={handleAddRoom}
                >
                  Add
                </Button>
              </Grid>           
          </Grid>       
          <div className={classes.buttons}>
            <Button className={classes.button} 
              onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleCreateApartment}
            >
              Create apartment
            </Button>
          </div>
        </Fragment>
      </Paper>
    </main>
  );
};

ApartmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  createApartment: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createApartment
};

export default flow(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ApartmentForm);
