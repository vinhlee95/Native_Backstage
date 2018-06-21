import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ListItem = (props) => {
   return(
      <TouchableHighlight
         onPress={() => props.onPress()}
         underlayColor="#d1d3d6">
         <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Ionicons name="ios-arrow-forward" size={20} color="#cacdd1" />
         </View>
      </TouchableHighlight>
   )
}

const styles = {
   container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#cacdd1',
      paddingTop: 10, paddingBottom: 10,
   },
   title: {
      fontSize: 15
   }
}

export default ListItem;