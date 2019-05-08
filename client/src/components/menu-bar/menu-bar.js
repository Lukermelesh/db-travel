import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Button, AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { ADMIN, ORGANIZER, REGULAR } from '../../constants/user-types';
import { getUserType } from '../../selectors/user-data';
import { connect } from 'react-redux';

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

const menuItems = [
  {
    to: routes.MY_TRIPS_ROUTE,
    text: 'My Trips',
    forUsers: [REGULAR, ORGANIZER, ADMIN]
  },
  { to: routes.ALL_TRIPS_ROUTE, text: 'All Trips', forUsers: [ORGANIZER] }
];

//TODO: make different navigation for mobile (with hamburger icon)
const MenuBar = ({ active, classes, userType }) => {
  const makeButton = (text, to, isActive) => (
    <Link className={classes.navLink} key={to} to={to}>
      <Button variant={isActive ? 'outlined' : 'text'}>{text}</Button>
    </Link>
  );

  return (
    <AppBar style={{ marginBottom: 18 }} position="static">
      <Toolbar className={classes.root}>
        <div>
          {menuItems
            .filter(item => item.forUsers.includes(userType))
            .map(item => makeButton(item.text, item.to, item.to === active))}
        </div>
        <Button onClick={() => alert('should logout')}>Log Out</Button>
      </Toolbar>
    </AppBar>
  );
};

MenuBar.propTypes = {
  active: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userType: getUserType(state)
});

export default connect(mapStateToProps)(withStyles(styles)(MenuBar));
