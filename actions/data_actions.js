import {
   SAVE_DATA,
} from './types';
import firebase from 'firebase';

export const saveData = (firstName, lastName, location, callback) => async (dispatch) => {
   let database = firebase.database();
   const uid = firebase.auth().currentUser.uid;
   let userPath = database.ref(`users/${uid}`);
   await userPath.set({
      firstName,
      lastName,
      location,
   });
   console.log(`firstName: ${firstName}, lastName: ${lastName} and `);
   console.log(location)
   callback();   
   dispatch({
      type: SAVE_DATA,
      payload: {
         firstName,
         lastName,
         location
      }
   });
}