import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import dataReducer from './profile_data_reducer';
import performerDataReducer from './performer_data_reducer';
import performance_data_reducer from './performance_data_reducer';

export default combineReducers({
   auth: authReducer,
   data: dataReducer,
   performerData: performerDataReducer,
   localPerformanceData: performance_data_reducer
})