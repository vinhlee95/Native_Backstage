import { FETCH_GIGS_DATA } from '../actions/types';

export default (state={}, action) => {
   switch(action.type) {
      case FETCH_GIGS_DATA:
         return action.payload;

      default:
         return state;
   }
}