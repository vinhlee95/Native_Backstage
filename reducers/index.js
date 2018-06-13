import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import dataReducer from './data_reducer';
import routeReducer from './route_reducer';

export default combineReducers({
   auth: authReducer,
   data: dataReducer,
   route: routeReducer,
})