import React from 'react';
import { Alert } from 'react-native';

export default alertMessage = (title, message) => {
   return(
      Alert.alert(
         title?title:'Information Saved',
         message?message:'Your information has been saved',
         [
            { text: 'OK' }
         ]

      )
   )
}