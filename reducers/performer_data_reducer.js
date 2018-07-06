import { FETCH_PERFORMER_DATA } from '../actions/types';

export default (state=[], action) => {
   switch(action.type) {
      case FETCH_PERFORMER_DATA:
         return action.payload;

      default:
         return state;
   }
}