import React, { Component } from 'react';
import { Text, View, ScrollView, Animated } from 'react-native';
import firebase from 'firebase';
import ViewContainer from './UI/View';
import Header from './UI/Header';

import { connect } from 'react-redux';
import * as actions from '../actions';

import Icon from 'react-native-vector-icons/FontAwesome';

class Dashboard extends Component {
   static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => (
         focused
         ?
         <Icon name="briefcase" size={24} color="#1a4b93" />
         :
         <Icon name="briefcase" size={24} />
      ),
   }

   render() {
      console.log(this.props.navigation.state.key)
      let email = null;
      if (firebase.auth().currentUser) {
         email = firebase.auth().currentUser.email;
      }
      return(
         <View style={{ flex: 1 }}>
            <Header 
               headerName="Dashboard" 
               route={this.props.navigation.state.key}
               onPress={() => {
                  this.props.navigation.navigate('Account');
                  this.props.saveRouteName('Dashboard');
               }} />   
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


export default connect(null, actions)(Dashboard);