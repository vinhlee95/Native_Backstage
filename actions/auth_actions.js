import {
   AUTH_USER,
} from './types';
import firebase from 'firebase';

export const signup = (email, password, callback, handleError) => async (dispatch) => {
   console.log('CREATING ACCCOUNT')
   try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log(`A new user with email: ${email} has been created `)
      await firebase.auth().signInWithEmailAndPassword(email, password);      
      callback();
      dispatch({
         type: AUTH_USER,
         payload: firebase.auth().currentUser.email
      });
      // initial data record for new user
      let database = firebase.database();
      const uid = firebase.auth().currentUser.uid;
      let userPath = database.ref(`users/${uid}`);
      userPath.set({
         firstName: '',
         lastName: '',
         location: {
            detail:'',
            houseNumber: '',
            lat: '',
            lng: '',
            postalCode: ''
         },
      });
   } catch (error) {
      console.log(error)
      handleError(error);
   }
}

export const login = (email, password, callback, handleError) => async (dispatch) => {
   console.log('LOGGING IN');
   try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // const {uid} = firebase.auth().currentUser;
      callback();
      dispatch({
         type: AUTH_USER,
         payload: firebase.auth().currentUser.email
      })
   } catch (error) {
      // console.log(error);
      handleError(error);
   }
}