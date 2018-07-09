import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Calendar extends Component {
   static navigationOptions = {
      tabBarIcon: ({ focused }) => (
         focused
         ?
         <Ionicons name="ios-calendar" size={28} color="#1a4b93" />
         :
         <Ionicons name="ios-calendar" size={28} color="#8f9193" />
      ),
   }

   render() {
      return(
         <View style={{ flex: 1 }}>
            <Text>Calendar</Text>
         </View>
      );
   }
}

export default Calendar;