import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Profile extends Component {
   static navigationOptions = {
      tabBarIcon:  <Icon name="user" size={24} />
   }

   render() {
      return(
         <View>
            <Text>Profile</Text>
         </View>
      );
   }
}

export default Profile;