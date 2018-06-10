import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewContainer from './UI/View';
import Header from './UI/Header';

class Calendar extends Component {
   static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => (
         focused
         ?
         <Icon name="calendar" size={24} color="#2b6edb" />
         :
         <Icon name="calendar" size={24} />
      ),
   }

   render() {
      return(
         <View style={{ flex: 1 }}>
            <Header headerName = "Calendar" />
         </View>
      );
   }
}

export default Calendar;