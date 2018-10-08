import { combineReducers } from 'redux';
import authReducer from './loginReducer';

export default combineReducers({ user: authReducer})