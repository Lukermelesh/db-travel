import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/login-user';
import Grid from '@material-ui/core/Grid/Grid';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const LoginForm = ({ classes, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmail = event => setEmail(event.target.value);
  const updatePassword = event => setPassword(event.target.value);

  const handleLoginClick = () => loginUser(email, password);

  return (
    <form className={classes.form} noValidate>
    <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={updateEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={updatePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleLoginClick}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  loginUser
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(LoginForm));
