import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Calendar extends Component {
   static navigationOptions = {
      tabBarIcon:  <Icon name="calendar" size={24} />
   }

   render() {
      return(
         <View>
            <Text>Calendar</Text>
         </View>
      );
   }
}

export default Calendar;