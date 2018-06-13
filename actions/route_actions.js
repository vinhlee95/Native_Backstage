import { SAVE_ROUTE_NAME } from './types';

export const saveRouteName = (route) => {
   return {
      type: SAVE_ROUTE_NAME,
      payload: route,
   }
}