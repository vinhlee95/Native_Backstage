import React, { Component } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewContainer from './UI/View';
import Header from './UI/Header';
import Input from './UI/Input';
import Button from './UI/Button';
import LocationSearch from './Location/LocationSearch';
import Map from './Location/Map';

class Profile extends Component {
   static navigationOptions = {
      tabBarIcon:  <Icon name="user" size={24} />
   }

   handleSaveInfo = () => {
      console.log('Saved')
   }

   render() {
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
                  onSubmitEditing={()=> {} }
                  style={{ marginTop: 10}} />
               <Input placeholder="Last Name" />

               <View style={[styles.headingContainer, {marginTop: 20}]}>
                  <Icon name="map-marker" size={25} />               
                  <Text style={styles.heading}>Home address</Text>                  
               </View>
               <View>
                  <LocationSearch  placeholder="Street Adress" />                  
                  <Input placeholder="Number" keyboardType="numeric" />
               </View>
               <View>
                  <Input placeholder="Postal Code" keyboardType="numeric"  />
                  <LocationSearch  placeholder="City" />                 
               </View>
               <View style={[styles.headingContainer, {marginTop: 20, marginBottom: 20}]}>
                  <Icon name="map" size={25} />               
                  <Text style={styles.heading}>Map</Text>                  
               </View>
               <View style={{ flex: 1 }}>
                  <Map />
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

export default Profile;