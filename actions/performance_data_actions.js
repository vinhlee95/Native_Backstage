import { ADD_PERFORMANCE, DELETE_PERFORMANCE, UPDATE_PERFORMANCE } from './types';

export const addPerformance = (name, title, description, tagData, image) => {
   const {
      audienceSize,
      audio,
      duration,
      carToDoor,
      electricity,
      price
   } = tagData;
   return {
      type: ADD_PERFORMANCE,
      payload: {
         title,
         description,
         performerData: {
            name,
         }, 
         audienceSize, audio, duration, carToDoor, electricity, price,
         image,
      }
   }
}

export const deletePerformance = (id) => {
   return {
      type: DELETE_PERFORMANCE,
      payload: id
   }
}

export const updatePerformance = (name, title, description, tagData, image, id) => {
   const {
      audienceSize,
      audio,
      duration,
      carToDoor,
      electricity,
      price
   } = tagData;
   return {
      type: UPDATE_PERFORMANCE,
      payload: {
         performerData: {
            name
         },
         title,
         description,
         audienceSize, audio, duration, carToDoor, electricity, price,
         image,
         id
      }
   }
}