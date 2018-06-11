import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import Header from '../UI/Header';
import Button from '../UI/Button';
import firebase from 'firebase';

export default class Account extends Component {

   handleSignout = () => {
      firebase.auth().signOut();
      this.props.navigation.navigate('login');
   }

  render() {
     console.log(this.props.goBackKey)
      let email = null;
      if (firebase.auth().currentUser) {
         email = firebase.auth().currentUser.email;
      }
      return (
         <View style={{flex:1}}>
            <Header 
               headerName="Account" 
               notShowIcon showDone
               navigateBack={() => this.props.navigation.navigate('Dashboard')} />
            <View style={styles.header}>
               <Image 
                  source={require('../../images/CV_Crop.jpg')} 
                  style={{ 
                     width: 150, 
                     height: 150,
                     marginLeft: 'auto',
                     marginRight: 'auto',
                     borderRadius: 75
                  }}
               />
               <Text style={styles.email}>{email}</Text>
            </View>
            <Button 
               title="Log Out" 
               style={styles.button}
               onPress={this.handleSignout} />
         </View>
      )
   }
}

const styles = {
   header: {
      backgroundColor: '#edf0f4',
      paddingTop: 10,
      paddingBottom: 10,
   }, 
   email: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
   },
   button: {
      backgroundColor: '#ed3838',
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%'
   }
}