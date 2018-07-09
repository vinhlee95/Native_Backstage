import React, { Component } from 'react';
import { Text, View, ScrollView, Animated } from 'react-native';
import firebase from 'firebase';
import ViewContainer from './UI/View';

import { Ionicons } from '@expo/vector-icons';

class Dashboard extends Component {
   static navigationOptions = {
      tabBarIcon: ({ focused }) => (
         focused
         ?
         <Ionicons name="ios-briefcase" size={28} color="#1a4b93" />
         :
         <Ionicons name="ios-briefcase" size={28} color="#8f9193"/>
      ),
   }

   render() {
      let email = null;
      if (firebase.auth().currentUser) {
         email = firebase.auth().currentUser.email;
      }
      return(
         <View style={{ flex: 1 }}>
            {/* <Header 
               headerName="Dashboard" 
               onPress={() => {
                  this.props.navigation.navigate('Account');
               }} />    */}
            <ScrollView style={{ flex: 1 }}>         
               <ViewContainer >
                  <Text style={styles.title}>Welcome {email}</Text>
                  <Text style={{ fontSize: 18}}>You can find your need-to-confirm, upcoming and past gigs bellow</Text>
                  
               </ViewContainer>
               
            </ScrollView>
            
         </View>
      );
   }
}

const styles = {
   title: {
      fontSize: 25,
      marginTop: 15,
   }
}


export default Dashboard;