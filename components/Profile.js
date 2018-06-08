import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewContainer from './UI/View';
import Header from './UI/Header';
import Input from './UI/Input';

class Profile extends Component {
   static navigationOptions = {
      tabBarIcon:  <Icon name="user" size={24} />
   }

   render() {
      return(
         <ScrollView style={{ flex: 1 }}>
            <Header headerName = "Profile" />
            <ViewContainer>
               <Text style={styles.heading}>Basic information</Text>
               <Input placeholder="First Name" />
               <Input placeholder="Last Name" />

               <Text style={[styles.heading, {marginTop: 20}]}>Basic information</Text>
               <View>
                  <Input placeholder="Street Address" />
                  <Input placeholder="Number" keyboardType="numeric" />
               </View>
               <View>
                  <Input placeholder="Postal Code" keyboardType="numeric"  />
                  <Input placeholder="City" />                
               </View>
            </ViewContainer>
         </ScrollView>
      );
   }
}

const styles = {
   heading: {
      fontSize: 20,
      marginBottom: 0,
      paddingBottom: 0
   }
}

export default Profile;