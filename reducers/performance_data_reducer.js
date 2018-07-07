import { ADD_PERFORMANCE, DELETE_PERFORMANCE } from '../actions/types';
import { PERSIST_REHYDRATE, PERSIST } from 'redux-persist/lib/constants'

export default (state=[], action) => {
   switch(action.type) {
      case PERSIST_REHYDRATE:
         return action.payload.localPerformanceData || [];

      case ADD_PERFORMANCE: 
         return [...state, action.payload];

      case DELETE_PERFORMANCE:
         return [
            ...state.slice(0, action.payload-1),
            ...state.slice(action.payload)
         ]

      default:
         return state;
   }
}