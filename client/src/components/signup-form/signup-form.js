import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/signup-user';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const SignupForm = ({ classes, signupUser, match: {params} }) => {
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [password, setPassword] = useState('');

  const updatePasswordConfirmation = event => setPasswordConfirmation(event.target.value);
  const updatePassword = event => setPassword(event.target.value);

  const handleSignupClick = () => signupUser(passwordConfirmation, password, params.token);

  return (
    <form className={classes.form} noValidate>
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
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password confirmation"
        label="Password Confirmation"
        type="password"
        id="password-confirmation"
        onChange={updatePasswordConfirmation}
      />
      <Button
        onClick={handleSignupClick}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
    </form>
  );
};

SignupForm.propTypes = {
  signupUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  signupUser
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(SignupForm));
