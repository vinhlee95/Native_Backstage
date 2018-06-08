import React, { Component } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewContainer from './UI/View';
import Header from './UI/Header';
import Input from './UI/Input';
import LocationSearch from './Location/LocationSearch';

class Profile extends Component {
   static navigationOptions = {
      tabBarIcon:  <Icon name="user" size={24} />
   }

   render() {
      return(
         <KeyboardAvoidingView behavior="padding" style={{ flex: 1}}>
         <Header headerName = "Profile" />         
         <ScrollView style={{ flex: 1 }}>
            <ViewContainer>
               <View style={styles.headingContainer}>
                  <Icon name="info-circle" size={25} />               
                  <Text style={styles.heading}>Basic information</Text>
               </View>
               <Input 
                  placeholder="First Name"
                  onSubmitEditing={()=> {} } />
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
                  <Input placeholder="City" />                
               </View>
            </ViewContainer>
         </ScrollView>
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