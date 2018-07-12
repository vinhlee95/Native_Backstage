import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ListItem = (props) => {
   const styles = {
      container: {
         backgroundColor: 'white',
         flexDirection: 'row',
         alignItems: 'center',
      },
      listItem: {
         borderBottomWidth: 0.5,
         borderColor: '#e0e2e5',
         paddingTop: 10,
         paddingBottom: 10,
         flexDirection: 'row',
         justifyContent: 'space-between',
         flex: 1,
      },
      title: {
         fontSize: 18,
      },
      leftIcon: {
         marginLeft: 10, marginRight: 10,
      },
      rightIcon: {
         marginRight: 10,
      }
   }
   return(
      <TouchableOpacity onPress={props.onPress}>
         <View style={styles.container}>
            <Ionicons name={props.icon} size={20} style={styles.leftIcon} />
            <View style={styles.listItem}>
               <Text style={styles.title}>{props.title}</Text>
               <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} color={styles.listItem.borderColor} />
            </View>
         </View>
      </TouchableOpacity>
   );
}

export default ListItem;