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
            source={require('../../../images/profile.png')}
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
   return(
      <TouchableHighlight onPress={props.saveInfo} >
         <View>
            <Text
               style={{ 
                  fontSize: 18, 
                  color: 'white',
                  marginRight: 10,
               }}>
               {props.headerRightTitle}</Text>
         </View>
      </TouchableHighlight>
   )
}