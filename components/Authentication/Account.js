import React, { Component } from 'react'
import { View, Text, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../UI/Header';
import Button from '../UI/Button';
import firebase from 'firebase';
import ViewContainer from '../UI/View';

export default class Account extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         header: <Header headerName="Account" notShowIcon showDone navigateBack={() => navigation.navigate('Dashboard')} />
      }
   }

   handleSignout = () => {
      firebase.auth().signOut();
      this.props.navigation.navigate('login');
   }

  render() {
      let email = null;
      if (firebase.auth().currentUser) {
         email = firebase.auth().currentUser.email;
      }
      return (
         <View style={{flex:1, backgroundColor: 'white'}}>
            
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
            <ViewContainer>
                <ListItem 
                    title="Edit your profile" 
                    leftIcon={<Icon name="user" size={20} style={{ marginRight: 10}} />}
                    titleStyle={{ fontSize: 18}}
                    containerStyle={{ borderBottomWidth: .5, paddingLeft: 0 }}
                    onPress={() => this.props.navigation.navigate('Profile')} />
                <Button 
                title="Log Out" 
                style={styles.button}
                onPress={this.handleSignout} />
            </ViewContainer>
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
      marginRight: '10%',
      marginTop: 20,
   }
}