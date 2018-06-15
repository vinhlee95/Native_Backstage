import {
   SAVE_DATA,
   LOAD_DATA,
} from '../actions/types';

export default (state = {}, action) => {
   switch (action.type) {
      case SAVE_DATA:
         return action.payload;

      case LOAD_DATA:
         return action.payload;

      default:
         return state;
   }
}