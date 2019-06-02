import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import { connect } from 'react-redux';
import List from '@material-ui/core/List/List';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { flow } from 'lodash';
import TextField from '@material-ui/core/TextField';
import { createApartment } from '../../actions/create-apartment';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { MY_TRIPS_ROUTE } from '../../constants/routes';
import { Link } from 'react-router-dom';

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
  centerItem: {
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const ApartmentForm = ({ classes, createApartment }) => {
  const [title, setTitle] = useState();
  const [address, setAddress] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [roomNumberList, setRoomNumberList] = useState([]);

  const handleCreateApartment = () =>
    createApartment({ title, address, rooms: roomNumberList });
  const handleAddRoom = () => {
    if (!roomNumberList.includes(roomNumber))
      setRoomNumberList([...roomNumberList, roomNumber]);
  };
  const handleRemoveRoom = room => () =>
    setRoomNumberList(roomNumberList.filter(r => r !== room));

  const renderRooms = () => (
    <List>
      {roomNumberList.map((roomId, index) => (
        <Fragment key={index}>
          <div className={classes.container}>
            <Typography>{roomId}</Typography>
            <IconButton onClick={handleRemoveRoom(roomId)}>
              <DeleteForever />
            </IconButton>
          </div>
          <br />
        </Fragment>
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
            <Grid item xs={12} sm={12}>
              <TextField
                margin="none"
                label="Title"
                fullWidth
                onChange={event => setTitle(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Address"
                fullWidth
                onChange={event => setAddress(event.target.value)}
                margin="none"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                label="Room Number"
                fullWidth
                onChange={event => setRoomNumber(event.target.value)}
                margin="none"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2} className={classes.centerItem}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddRoom}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={12}>
              {renderRooms()}
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button className={classes.button}>
              <Link to={MY_TRIPS_ROUTE}>Cancel</Link>
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
