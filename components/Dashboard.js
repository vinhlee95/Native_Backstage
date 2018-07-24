import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import { Ionicons } from '@expo/vector-icons';
import Label from './UI/Label';
import Modal from './UI/Modal';

import { connect } from 'react-redux';
import * as actions from '../actions';

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

   componentWillMount() {
      this.props.fetchGigsData();
   }
   
   handleNavigate = () => {
      this.props.navigation.navigate('GigDetails', {
         gigDetails: this.props.gigsData
      });
   }

   render() {
      // console.log(this.props.gigsData)
      let email = null;
      if (firebase.auth().currentUser) {
         email = firebase.auth().currentUser.email;
      }
   
      // render loading modal
      if(!this.props.gigsData) {
         return <Modal
                  title = "Loading your gigs"
                  spinnerSize = "small"
                  bannerBackgroundColor = "white" / >
      }

      const gigsData = this.props.gigsData;

      {/* check the charge status to conditionally render icon */}
      let status = gigsData.gigStatus ? gigsData.gigStatus.toUpperCase() : '';

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
                  icon='ios-film-outline'
                  iconColor='orange'
                  style={styles.label} />
               <TouchableOpacity onPress={this.handleNavigate}>
                  <View style={[styles.textContainer, styles.upcomingGigsContainer]}>
                     <View style={styles.info}>
                        <Text style={styles.time}>{gigsData.gigTime}</Text>
                        <View style={styles.listItem}>
                           <Ionicons name='ios-calendar-outline' size={25} color='orange' />
                           <Text style={styles.infoText}>{gigsData.gigDate}</Text>
                        </View>

                        <View style={styles.listItem}>
                           <Ionicons name='ios-navigate-outline' size={25} color='blue' />
                           <Text style={styles.infoText}>{gigsData.gigAddress}</Text>
                        </View>

                        <View style={styles.listItem}>
                           {/* conditionally render charged icon */}
                           {
                              status === 'CHARGED'
                              ?
                              <Ionicons name='ios-checkmark-circle-outline' size={25} color='green' />
                              :
                              <Ionicons name='ios-warning-outline' size={25} color='red' />
                           }
                           <Text style={styles.infoText}>{gigsData.gigStatus}</Text>
                        </View>
                     </View>
                     <Ionicons name='ios-arrow-forward' size={30} color='#e0e2e5' />
                  </View>
               </TouchableOpacity>

               <Label 
                  title='Past gigs'
                  icon='ios-bookmarks-outline'
                  color='lightgreen'
                  style={styles.label} />
               <View style={styles.textContainer}>
                  <Text style={styles.text}>You have not had any previous gigs yet</Text>
               </View>
            </ScrollView>
            
         </View>
      );
   }
}

const styles = {
   label: {
      marginTop: 10, marginBottom: 10,
   },    
   textContainer: {
      backgroundColor: 'white',
      paddingTop: 10, paddingBottom: 10, paddingLeft: '2.5%',
      marginBottom: 20
   },
   upcomingGigsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      flex: 1,
      paddingRight: 10,
   },
   listItem: {
      flexDirection: 'row', justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 10,
   },
   infoText: {
      fontSize: 18,
      marginLeft: 10
   }, 
   text: {
      fontSize: 18,
   },
   time: { fontSize: 30 }
}

const mapStateToProps = ({ gigsData }) => {
   return { gigsData };
}


export default connect(mapStateToProps, actions)(Dashboard);