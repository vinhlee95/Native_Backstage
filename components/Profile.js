import React, { Component } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewContainer from './UI/View';
import Header from './UI/Header';
import Input from './UI/Input';
import Button from './UI/Button';
import LocationSearch from './Location/LocationSearch';
import Map from './Location/Map';

import { connect } from 'react-redux';
import * as actions from '../actions';
import firebase from 'firebase';
import Banner from './UI/Banner';

class Profile extends Component {
   static navigationOptions = {
      tabBarIcon:  <Icon name="user" size={24} />
   }
   state = { 
      firstName: '',
      lastName: '',
      location: 
         {
            lat:'', lng:'', 
            houseNumber:  '', 
            postalCode:  ''
         },
      isBannerShowed: false,
   }

   componentDidMount() {
      const uid = firebase.auth().currentUser.uid;
      const userPath = firebase.database().ref(`users/${uid}`);
      const data = userPath.on('value', snapshot => {
         const { firstName, lastName, location } = snapshot.val();
         this.setState({...this.state, firstName, lastName, location });
      });
   }
   
   handleSaveInfo = () => {
      const { firstName, lastName, location } = this.state;
      this.props.saveData(firstName, lastName, location, () => {
         this.setState({ isBannerShowed: true });
      });
   }

   handleSelectLocation = (lat, lng) => {
      this.setState({ location: {...this.state.location, lat, lng } });
   }

   render() {
      console.log(this.state)
      return(
         <KeyboardAvoidingView behavior="padding" style={{ flex: 1}}>
         <Header headerName = "Profile" />         
         <ScrollView style={{ flex: 1 }}>
            <ViewContainer>
               <View style={[styles.headingContainer, { marginTop: 15 }]}>
                  <Icon name="info-circle" size={25} />               
                  <Text style={styles.heading}>Basic information</Text>
               </View>
               <Input 
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChangeText={(firstName) => this.setState({ firstName })}
                  onSubmitEditing={()=> {} }
                  style={{ marginTop: 10}} />
               <Input 
                  placeholder="Last Name"
                  value={this.state.lastName}                  
                  onChangeText={(lastName) => this.setState({ lastName })} />

               <View style={[styles.headingContainer, {marginTop: 20}]}>
                  <Icon name="map-marker" size={25} />               
                  <Text style={styles.heading}>Home address</Text>                  
               </View>
               <View>
                  <LocationSearch  
                     placeholder="Adress" 
                     handleSelectLocation={this.handleSelectLocation} />                  
                  <Input 
                     placeholder="House number" 
                     value={this.state.location.houseNumber}
                     onChangeText={(houseNumber) => this.setState({ location: {...this.state.location, houseNumber} })} />
               </View>
               <View>
                  <Input 
                     placeholder="Postal Code"
                     value={this.state.location.postalCode} 
                     keyboardType="numeric"
                     onChangeText={(postalCode) => this.setState({ location: {...this.state.location, postalCode} })} />
               </View>
               <View style={[styles.headingContainer, {marginTop: 20, marginBottom: 20}]}>
                  <Icon name="map" size={25} />               
                  <Text style={styles.heading}>Map</Text>                  
               </View>
               <View style={{ flex: 1 }}>
                  <Map location={this.state.location}/>
               </View>
               
            </ViewContainer>
         </ScrollView>
         <Button 
            title="Save your information" 
            onPress={this.handleSaveInfo}
            style={{
               position: 'absolute',
               bottom: 0,
               width: '90%',
               left: '5%',
               opacity: .9
         }}/>
         {
            this.state.isBannerShowed 
            ? 
            <Banner handleCloseModal={() => this.setState({ isBannerShowed: false })} />
            : null
         }
         </KeyboardAvoidingView>
      );
   }
}

const styles = {
   headingContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start'
   },
   heading: {
      fontSize: 20,
      marginBottom: 0,
      marginLeft: 5,
      paddingBottom: 0,
      fontWeight: 'bold',
   }
}

export default connect(null, actions)(Profile);