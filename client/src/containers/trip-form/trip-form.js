import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import { connect } from 'react-redux';
import { createTrip } from '../../actions/create-trip';

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

const TripForm = ({ classes, createTrip }) => {
  //TODO: pass the form data somehow
  const handleCreateTrip = () => createTrip();

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Fragment>
          <Typography variant="h6" gutterBottom>
            New Trip
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                id="travellerName"
                name="travellerName"
                label="Traveller name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="origin"
                name="origin"
                label="Origin"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="destination"
                name="destination"
                label="Destination"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="from"
                name="from"
                label="From"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="until"
                name="until"
                label="Until"
                fullWidth
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button className={classes.button}>Cancel</Button>
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
  createTrip: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createTrip
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(TripForm));
