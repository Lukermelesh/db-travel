import { combineReducers } from 'redux';
import userData from './user-data';
import trips from './trips'

export default combineReducers({ userData, trips });
