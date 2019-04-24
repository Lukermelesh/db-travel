import React from 'react';
import {Toolbar, Button, AppBar} from '@material-ui/core';
import styles from './menu-bar.module.css';
import {Link} from 'react-router-dom';
import * as routes from '../../constants/routes';

const menuItems = [
  {to: routes.MY_TRIPS_ROUTE, text: 'My Trips'},
  {to: routes.ALL_TRIPS_ROUTE, text: 'All Trips'},
];

const MenuBar = ({active}) => <AppBar><Toolbar className={styles.root}>
  <div>
  {menuItems.map(item => <Link className={styles.button} key={item.to} to={item.to}><Button variant={item.to === active ? 'outlined' : 'text'}>{item.text}</Button></Link>)}
  </div>
  <Button onClick={() => alert('should logout')}>Log Out</Button>
</Toolbar></AppBar>;

export default MenuBar;
