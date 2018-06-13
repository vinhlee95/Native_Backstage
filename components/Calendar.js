import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewContainer from './UI/View';
import Header from './UI/Header';

import { connect } from 'react-redux';
import * as actions from '../actions';

class Calendar extends Component {
   static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => (
         focused
         ?
         <Icon name="calendar" size={24} color="#1a4b93" />
         :
         <Icon name="calendar" size={24} />
      ),
   }

   render() {
      return(
         <View style={{ flex: 1 }}>
            <Header 
               headerName = "Calendar"
               onPress={() => {
                  this.props.navigation.navigate('Account');
                  this.props.saveRouteName('Calendar');
               }} />
         </View>
      );
   }
}

export default connect(null, actions)(Calendar);