import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ReusableButton = (props) => {
   const buttonStyle = {
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center'
   }
   const titleStyle = {
      borderBottomWidth: 0.5,
      paddingTop: 15,
      paddingBottom: 15,
      borderColor: '#cacdd1',
      flex: 1, flexDirection: 'row'
   };
   const textStyle = {
      fontSize: 18,
   };
   const iconStyle = {
      marginRight: 10
   }
   return(
      <TouchableOpacity onPress={props.onPress}>
         <View style={[buttonStyle, props.style]}>
            {
               props.icon
               ?
               <Ionicons name={props.icon} size={25} style={iconStyle} color={props.iconColor?props.iconColor:'black'} />
               :
               null
            }
            <View style={[titleStyle, props.titleContainerStyle]}>
               <Text 
                  style={[textStyle, props.textStyle]} >
                  {props.title}
               </Text>
            </View>
         </View>
      </TouchableOpacity>
   );
}



export default ReusableButton;