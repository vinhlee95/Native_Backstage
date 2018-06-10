import {
   SAVE_DATA,
   LOAD_DATA,
   DISPLAY_NAVBAR
} from '../actions/types';

export default (state = {}, action) => {
   switch (action.type) {
      case SAVE_DATA:
         return action.payload;

      case LOAD_DATA:
         return action.payload;
         console.log(action.payload)


      default:
         return state;
   }
}