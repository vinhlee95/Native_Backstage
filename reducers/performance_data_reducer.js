import { ADD_PERFORMANCE, DELETE_PERFORMANCE, UPDATE_PERFORMANCE } from '../actions/types';
import { PERSIST_REHYDRATE, PERSIST } from 'redux-persist/lib/constants'
import _ from 'lodash';

export default (state=[], action) => {
   switch(action.type) {
      case PERSIST_REHYDRATE:
         return action.payload.localPerformanceData || {};

      case ADD_PERFORMANCE: 
         return [...state, action.payload];

      case UPDATE_PERFORMANCE: 
      const { id } = action.payload;
      const updatedState = [...state];
      updatedState.splice(id-1, 1, action.payload)
         return updatedState;

      case DELETE_PERFORMANCE:
         const index = action.payload;
         const newState = [...state];
         newState.splice(index,1);
         return newState;

      default:
         return state;
   }
}