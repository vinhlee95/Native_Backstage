import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import dataReducer from './data_reducer';

export default combineReducers({
   auth: authReducer,
   data: dataReducer,
})