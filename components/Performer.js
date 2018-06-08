import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Performer extends Component {
   static navigationOptions = {
      tabBarIcon:  <Icon name="gift" size={24} />
   }

   render() {
      return(
         <View>
            <Text>Performer</Text>
         </View>
      );
   }
}

export default Performer;