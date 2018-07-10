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
      const updatedItem = updatedState.find(item => item.id === id);
      // console.log(updatedItem)
      const index = updatedState.indexOf(updatedItem);
      console.log(`Item with index of ${index}, id of ${id} is already updated`);
      updatedState.splice(index, 1, action.payload)
         return updatedState;

      case DELETE_PERFORMANCE:
         const idD = action.payload;
         const newState = [...state];
         const deletedItem = newState.find(item => item.id === idD);
         const indexD = newState.indexOf(deletedItem);
         console.log(`Item with index of ${indexD}, id of ${idD} is deleted`);
         newState.splice(indexD, 1);
            return newState;

      default:
         return state;
   }
}