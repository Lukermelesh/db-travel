import React, { Fragment } from 'react';
import { MenuBar } from '../../components/menu-bar';
import Grid from '@material-ui/core/Grid/Grid';

const View = ({ active, children }) => (
  <Fragment>
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
        <MenuBar active={active} />
      </Grid>
    </Grid>
    {children}
  </Fragment>
);

export default View;
