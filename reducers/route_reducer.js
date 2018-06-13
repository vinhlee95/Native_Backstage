import { SAVE_ROUTE_NAME } from '../actions/types';

export default (state='', action) => {
   switch(action.type) {
      case SAVE_ROUTE_NAME:
         return action.payload;

      default:
         return state;
   }
}
