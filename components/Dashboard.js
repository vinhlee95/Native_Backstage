import React, { Component } from 'react';
import { Text, View, ScrollView, Animated } from 'react-native';
import firebase from 'firebase';
import ViewContainer from './UI/View';

import { Ionicons } from '@expo/vector-icons';
import Label from './UI/Label';

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
            <ScrollView style={{ flex: 1, paddingTop: 10 }}>         
                  <Label 
                     title='Need your confirmation'
                     icon='ios-alert-outline'
                     iconColor='red'
                     style={styles.label} />
                  <View style={styles.textContainer}>
                     <Text style={styles.text}>All set! There is currently no gigs that need your confirmation</Text>
                  </View>

                  <Label 
                     title='Upcoming gigs'
                     icon='ios-bonfire-outline'
                     iconColor='orange'
                     style={styles.label} />

                  <Label 
                     title='Past gigs'
                     icon='ios-folder-open-outline'
                     color='lightgreen'
                     style={styles.label} />
            </ScrollView>
            
         </View>
      );
   }
}

const styles = {
   label: {
      paddingLeft: '2.5%',
      marginTop: 10, marginBottom: 10,
   },    
   textContainer: {
      backgroundColor: 'white',
      paddingTop: 10, paddingBottom: 10, paddingLeft: '2.5%'
   },
   text: {
      fontSize: 18,
   }
}


export default Dashboard;