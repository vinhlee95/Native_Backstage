import { FETCH_PERFORMER_DATA, CREATE_PERFORMER, UPDATE_PERFORMER } from '../actions/types';
import {
   PERSIST_REHYDRATE,
   PERSIST
} from 'redux-persist/lib/constants'


export default (state=[], action) => {
   switch(action.type) {
      case PERSIST_REHYDRATE:
      console.log(action.payload.performerData)
         return action.payload.performerData || {};

      case FETCH_PERFORMER_DATA:
         // console.log([...state])
         console.log([...state][0].products.length)
         return action.payload;

      case CREATE_PERFORMER:
         return [...state, action.payload];

      case UPDATE_PERFORMER:
         const {
            id
         } = action.payload.data;
         // get a copy of existing state
         const updatedState = [...state];
         // find the updated item
         const updatedItem = updatedState.find(performer => performer.data.id === id);
         // find index of updated Item
         const index = updatedState.indexOf(updatedItem);
         // form a new item 
         const newItem = {
            data: action.payload.data,
            products: action.payload.products
         };
         console.log(newItem)
         // replace the updated item by the new one
         updatedState.splice(index, 1, newItem);
         console.log(`Performer with id of ${id} is successfully updated`)
            return updatedState;

      default:
         return state;
   }
}