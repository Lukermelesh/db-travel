import React, { Fragment } from 'react';
import { MenuBar } from '../../components/menu-bar';
import Grid from '@material-ui/core/Grid/Grid';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../../selectors/user-data';
import connect from 'react-redux/es/connect/connect';
import { LoginView } from '../login-view';

const View = ({ active, isLoggedIn, children }) => {
  const renderedView = (
    <Fragment>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <MenuBar active={active} />
        </Grid>
      </Grid>
      {children}
    </Fragment>
  );
  const loginView = <LoginView />;

  return isLoggedIn ? renderedView : loginView;
};

View.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state)
});

export default connect(mapStateToProps)(View);
