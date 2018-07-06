import { ADD_PERFORMANCE } from '../actions/types';

export default (state={}, action) => {
   switch(action.type) {
      case ADD_PERFORMANCE: 
         return action.payload;

      default:
         return state;
   }
}