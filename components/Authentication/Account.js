import React, { Component } from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
// import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import Button from '../UI/Button';
import firebase from 'firebase';
import ViewContainer from '../UI/View';
import Modal from '../UI/Modal';
import ListItem from '../UI/ListItem';

import { HeaderTitle, HeaderLeftTitle } from '../UI/Header/index.js';

class Account extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Settings" />,
         headerLeft: <HeaderLeftTitle navigation={navigation}/>,
         headerStyle: {
            backgroundColor: '#1a4b93'
         },
         headerTintColor: 'white'
      }
   }

   state = { showModalLogout: false }

   handleSignout = () => {
      this.setState({ showModalLogout: true })
      setTimeout(() => {
         firebase.auth().signOut();
         this.props.navigation.navigate('login');
        this.setState({ showModalLogout: false })
      }, 1000);
      
   }

  render() {
      let email = null;
      if (firebase.auth().currentUser) {
         email = firebase.auth().currentUser.email;
      }
      return (
         <View style={{flex:1, backgroundColor: '#edeeef'}}>
            <View style={styles.header}>
                <Image 
                    source={require('../../images/profile_big.png')} 
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
            <Text style={styles.label}>ACCOUNT</Text>
            <View style={{ marginTop: 10, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor:'#e0e2e5' }}>
                <ListItem 
                    title='Edit your profile'
                    icon='ios-create-outline'
                    onPress={() => this.props.navigation.navigate('Profile')} />
              
                <Button 
                  title="Log Out" 
                  style={styles.button}
                  textStyle={{color: 'red'}}
                  onPress={this.handleSignout}
                  icon='ios-log-out' />
                  
            </View>
            {
               this.state.showModalLogout
               ?
               <Modal
                  title="Logging out"
                  spinnerColor='#c7c7d6'
                  textColor='#c7c7d6'
                  spinnerSize='small'
                  bannerBackgroundColor='#333335' />
               :null
            }
         </View>
      )
   }
}

const styles = {
   headerLeft: {
      paddingLeft: 10,
   },
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
      borderTopWidth: 0,
      borderBottomWidth: 0,
   },
   label: {
      fontSize: 18,
      marginLeft: 10, marginTop: 10,
   }
}


export default Account;