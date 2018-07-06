import React from 'react';
import { Alert } from 'react-native';

export default alertMessage = (callback) => {
   return(
      Alert.alert(
         'Information Saved',
         'Your information has been saved',
         [
            { text: 'OK', onPress: callback? () => callback(): null }
         ]

      )
   )
}