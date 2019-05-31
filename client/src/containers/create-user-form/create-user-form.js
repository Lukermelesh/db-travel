import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import { flow } from 'lodash';
import connect from 'react-redux/es/connect/connect';
import withStyles from '@material-ui/core/styles/withStyles';
import { createUser } from '../../actions/create-user';
import TextField from '@material-ui/core/TextField/TextField';

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
  fullWidth: {
    width: '100%'
  }
});

const CreateUserForm = ({ classes, createUser, history }) => {
  const [email, setEmail] = useState();
  const handleCancel = () => history.goBack();
  const handleCreateUser = () => createUser(email);

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Fragment>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Create New User
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                className={classes.fullWidth}
                onChange={setEmail}
                placeholder="Email"
                margin="none"
              />
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
              onClick={handleCreateUser}
            >
              Create User
            </Button>
          </div>
        </Fragment>
      </Paper>
    </main>
  );
};

CreateUserForm.propTypes = {
  classes: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createUser
};

export default flow(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CreateUserForm);
