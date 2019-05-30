import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import LoginForm from '../../components/login-form/login-form';

const LoginView = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
  >
    <Grid item xs={3}>
      <LoginForm />
    </Grid>
  </Grid>
);

export default LoginView;
