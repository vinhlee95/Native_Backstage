import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import ViewContainer from './UI/View';
import Header from './UI/Header';

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
         <View style={{ flex: 1 }}>
            <Header headerName="Dashboard"/>            
            <ViewContainer >
               <Text style={styles.title}>Welcome {email}</Text>
               <Text>You can find your need-to-confirm, upcoming and past gigs bellow</Text>
            </ViewContainer>
         </View>
      );
   }
}

const styles = {
   title: {
      fontSize: 25
   }
}

export default Dashboard;