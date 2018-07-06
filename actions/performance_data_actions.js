import { ADD_PERFORMANCE } from './types';

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