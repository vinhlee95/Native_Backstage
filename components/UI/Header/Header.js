import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HeaderTitle = (props) => {
   return(
      <Text
         style={{fontSize: 20, color: 'white', fontWeight: 'bold'}} >
         {props.headerTitle}
      </Text>
   );
}

export const HeaderLeftTitle = (props) => {
   return(
      <Ionicons 
         name="ios-arrow-back" 
         size={28} 
         color="white" 
         style={{paddingLeft: 10}} 
         onPress={() => props.navigation.goBack()}
      />
   )
}

export const HeaderRightIcon = (props) => {
   return(
      <TouchableHighlight onPress={() => props.navigation.navigate('Account')}  >
         <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/gigle-app.appspot.com/o/performers%2F-KdRcKf2I6DpEHDMOtB9%2FprofilePicture_thumb.jpg?alt=media&token=1a5b04a2-bce2-418d-a4f6-da567f690147'}}
            style={{
               width: 35,
               height: 35,
               borderRadius: 17.5,
               marginRight: 10,
            }}
         />
      </TouchableHighlight>
   )
}

export const HeaderRightTitle = (props) => {
   let handlePress = props.saveInfo ? props.saveInfo : props.editMode
   return(
      <TouchableHighlight onPress={handlePress} >
         <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
               style={{ 
                  fontSize: 18, 
                  color: 'white',
                  marginRight: 10,
                  fontWeight: '600'
               }}>
               {props.text? props.text: 'Done'}</Text>
            {
               props.showIcon
               ?
               <Ionicons name="ios-arrow-forward" size={28} color="white" style={{ marginRight: 5 }} />
               : null
            }
         </View>
      </TouchableHighlight>
   )
}