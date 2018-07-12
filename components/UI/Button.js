import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ReusableButton = (props) => {
   const buttonStyle = {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      borderColor: '#cacdd1',
      flexDirection: 'row'
   };
   const textStyle = {
      color: props.textColor?props.textColor:'red',
      fontSize: 18,
   };
   const iconStyle = {
      marginRight: 10, marginLeft: 10,
   }
   return(
      <TouchableOpacity onPress={props.onPress}>
         <View style={[buttonStyle, props.style]}>
            {
               props.icon
               ?
               <Ionicons name={props.icon} size={20} style={iconStyle} color={textStyle.color} />
               :
               null
            }
            <Text 
               style={[textStyle, props.textStyle]} >
               {props.title}
            </Text>
         </View>
      </TouchableOpacity>
   );
}



export default ReusableButton;