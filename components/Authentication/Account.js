import React, { Component } from 'react'
import { View, Text, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../UI/Header';
import Button from '../UI/Button';
import firebase from 'firebase';
import ViewContainer from '../UI/View';

import { connect } from 'react-redux';

class Account extends Component {
   static navigationOptions = {
       header: null,
   }

   handleSignout = () => {
      firebase.auth().signOut();
      this.props.navigation.navigate('login');
   }

  render() {
      console.log(this.props.route)
      let email = null;
      if (firebase.auth().currentUser) {
         email = firebase.auth().currentUser.email;
      }
      return (
         <View style={{flex:1, backgroundColor: 'white'}}>
            <Header 
                headerName="Account" 
                notShowIcon headerRightTitle="Done" 
                navigateBack={() => this.props.navigation.navigate(`${this.props.route}`)} />
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

const mapStateToProps = ({ route }) => {
    return { route };
}

export default connect(mapStateToProps)(Account);