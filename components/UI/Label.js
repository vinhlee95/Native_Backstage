import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from '../../node_modules/@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Label = (props) => {
   const styles = {
      label: {
         borderBottomWidth: 0.5, borderBottomColor: 'lightgrey', paddingBottom: 5,
         marginTop: 10, marginBottom: 10,
         flexDirection: 'row', alignItems: 'center'
      },
      title: {
         fontSize: 20,
         fontWeight: '600',
         paddingBottom: 5,
      },
      icon: {
         marginRight: 10,
      }
   }
   return(
      <View style={[styles.label, props.style]}>
         {
            props.icon
            ?
            <Ionicons name={props.icon} size={22} style={styles.icon} color={props.iconColor} />
            : 
            null
         }
          {
            props.fontAwesomeIcon
            ?
            <Icon name={props.fontAwesomeIcon} size={22} style={styles.icon} color={props.iconColor} />
            : 
            null
         }
         <Text style={styles.title}>{props.title}</Text>
      </View>
   );
}