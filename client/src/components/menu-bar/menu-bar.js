import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Button, AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue'
  },

  navLink: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const menuItems = [{ to: routes.MY_TRIPS_ROUTE, text: 'My Trips' }];

//TODO: make different navigation for mobile (with hamburger icon)
const MenuBar = ({ active, classes }) => {
  const makeButton = (text, to, isActive) => (
    <Link className={classes.navLink} key={to} to={to}>
      <Button variant={isActive ? 'outlined' : 'text'}>{text}</Button>
    </Link>
  );

  return (
    <AppBar style={{ marginBottom: 18 }} position="static">
      <Toolbar className={classes.root}>
        <div>
          {menuItems.map(item =>
            makeButton(item.text, item.to, item.to === active)
          )}
        </div>
        <Button onClick={() => alert('should logout')}>Log Out</Button>
      </Toolbar>
    </AppBar>
  );
};

MenuBar.propTypes = {
  active: PropTypes.string.isRequired
};

export default withStyles(styles)(MenuBar);
