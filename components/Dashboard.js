import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

class Dashboard extends Component {
   static navigationOptions = {
      tabBarIcon:  <Icon name="briefcase" size={24} />
   }

   render() {
      let email = null;
      if (firebase.auth().currentUser) {
         email = firebase.auth().currentUser.email;
      }
      return(
         <View style={styles.container} >
            <Text style={styles.header}>Welcome {email}</Text>
            <Text>You can find your need-to-confirm, upcoming and past gigs bellow</Text>
         </View>
      );
   }
}

const styles = {
   container: {
      flex: 1,
      marginTop: 20,
   },
   header: {
      fontSize: 25
   }
}

export default Dashboard;