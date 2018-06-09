import { AUTH_USER } from '../actions/types';

export default (state = {email: null}, action) => {
   switch(action.type) {
      case AUTH_USER:
         return { email: action.payload };
   
      default:
         return state;
   }
}