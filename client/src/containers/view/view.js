import React, {Fragment} from 'react';
import {MenuBar} from '../../components/menu-bar';

const View = ({active, children}) => <Fragment>
  <MenuBar active={active}/>
  {children}
</Fragment>;

export default View;