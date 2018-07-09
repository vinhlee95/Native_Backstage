import { FETCH_PERFORMER_DATA, CREATE_PERFORMER } from '../actions/types';
import {
   PERSIST_REHYDRATE,
   PERSIST
} from 'redux-persist/lib/constants'


export default (state=[], action) => {
   switch(action.type) {
      // case PERSIST_REHYDRATE:
         // return action.payload.performerData || [];

      case FETCH_PERFORMER_DATA:
         return action.payload;

      case CREATE_PERFORMER:
         return [...state, action.payload];

      default:
         return state;
   }
}