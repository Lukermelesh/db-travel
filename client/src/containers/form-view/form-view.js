import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import PropTypes from 'prop-types';

const FormView = ({ match, Form }) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
  >
    <Grid item xs={3}>
      <Form match={match} />
    </Grid>
  </Grid>
);

FormView.propTypes = {
  Form: PropTypes.object
};

export default FormView;
