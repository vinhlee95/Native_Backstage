import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from '../../node_modules/@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Label = (props) => {
   const styles = {
      labelContainer: {
         marginBottom: 5, 
         flex: 1, flexDirection: 'row', alignItems: 'center',
      },
      leftIconContainer: {
         flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      },
      titleContainer: {
         flex: 10, flexDirection: 'row', paddingLeft: '2.5%'
      },
      title: {
         fontSize: 18,
         fontWeight: '600',
      },
   }
   return(
      <View style={[styles.labelContainer, props.style]}>
         {
            props.icon
            ?
            <View style={styles.leftIconContainer}>
               <Ionicons name={props.icon} size={22} style={styles.icon} color={props.iconColor} />
            </View>
            : 
            null
         }
         {
            props.fontAwesomeIcon
            ?
            <View style={styles.leftIconContainer}>
               <Icon name={props.fontAwesomeIcon} size={22} style={styles.icon} color={props.iconColor} />
            </View>
            : 
            null
         }
         <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
         </View>
      </View>
   );
}