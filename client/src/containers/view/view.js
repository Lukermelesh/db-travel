import React, { Fragment } from 'react';
import { MenuBar } from '../../components/menu-bar';
import Grid from '@material-ui/core/Grid/Grid';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../../selectors/user-data';
import connect from 'react-redux/es/connect/connect';
import FormView from '../form-view/form-view';
import { LoginForm } from '../../components/login-form';

const View = ({ active, isLoggedIn, children, hideLogin }) => {
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
  const loginView = <FormView Form={LoginForm} />;

  if (hideLogin) {
    return renderedView;
  } else {
    return isLoggedIn ? renderedView : loginView;
  }
};

View.propTypes = {
  hideLogin: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  active: PropTypes.string
};

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state)
});

export default connect(mapStateToProps)(View);
