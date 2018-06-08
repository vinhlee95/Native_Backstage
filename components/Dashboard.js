import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

class Dashboard extends Component {

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