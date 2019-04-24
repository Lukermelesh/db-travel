import React, {Fragment} from 'react';
import {MenuBar} from '../../components/menu-bar';
import {MY_TRIPS_ROUTE} from '../../constants/routes';

const TripsView = () => <Fragment>
  <MenuBar active={MY_TRIPS_ROUTE}/>
</Fragment>;

export default TripsView;