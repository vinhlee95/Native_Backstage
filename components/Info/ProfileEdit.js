import React, { Component } from 'react';
import { ScrollView, View, Text, Animated, Keyboard, Alert } from 'react-native';

import ListItem from '../UI/ListItem';
import LocationSearch from '../Location/LocationSearch';
import Map from '../Location/Map';
import alertMessage from '../UI/alertMessage';

import { connect } from 'react-redux';
import * as actions from '../../actions';


import {
   HeaderTitle,
   HeaderLeftTitle,
   HeaderRightTitle
} from '../UI/Header/index.js';


class ProfileEdit extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Edit your profile" />,
         headerLeft: <HeaderLeftTitle navigation={navigation}/>,
         headerRight: <HeaderRightTitle 
                        saveInfo={navigation.getParam('saveInfo')} />,
         headerStyle: {
            backgroundColor: '#1a4b93'
         },
         headerTintColor: 'white'
      }
   }

   constructor(props) {
      super(props);
      const { profileData } = this.props.navigation.state.params;
      const { firstName, lastName, location } = profileData;
      this.state = {
         firstName, lastName, 
         location
      };
      this.keyboardHeight = new Animated.Value(0);
      this.inputs = {};
   }

   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
   }

   componentDidMount() {
      // allowing header right button 
      // to get access to function inside class
      this.props.navigation.setParams({
         saveInfo: this.handleSaveInfo
      });
   }

   handleSaveInfo = () => {
      const { firstName, lastName, location } = this.state;
      const { navigation } = this.props;

      this.props.saveData(firstName, lastName, location, () => {
         alertMessage(() => navigation.goBack());
      });

      navigation.state.params.returnData(this.state);
   }


   componentWillUnmount() {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
   }

   keyboardWillShow = (event) => {
      // this.setState({ flexNumber: 0.7})
      Animated.timing(this.keyboardHeight, {
         duration: event.duration,
         toValue: event.endCoordinates.height,
      }).start();
   };

   keyboardWillHide = (event) => {
      // this.setState({ flexNumber: 0.4})      
      Animated.timing(this.keyboardHeight, {
         duration: event.duration,
         toValue: 10,
      }).start();
   };

   handleSelectLocation = (lat, lng) => {
      this.setState({ location: {...this.state.location, lat, lng } });
   }

   submitLocationDescription = (description) => {
      const street = description.split(',').slice(0, 1).join('')
      const city = description.split(',').slice(1, 2).join('')
      const country = description.split(',').slice(2, 3).join('')
      this.setState({ location: {...this.state.location, description, street, city, country }})
   }

   handleFocusNextField = (fieldID) => {
      this.inputs[fieldID].focus();
   }


   render() {
      console.log(this.state.location)
      return(
         <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight } ]}>
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}> 
               <ListItem
                  title='First name'
                  textInputValue={this.state.firstName}
                  titleTextStyle={styles.title}
                  noArrow
                  onChangeText={(firstName) => this.setState({ firstName })}
                  returnKeyType='next'
                  onSubmitEditing={() => this.handleFocusNextField('lastName')} />
               />
               <ListItem 
                  title='Last name'
                  placeholder="Last Name"
                  textInputValue={this.state.lastName}                  
                  onChangeText={(lastName) => this.setState({ lastName })}
                  returnKeyType='next'
                  reference={input => this.inputs['lastName'] = input}
                  noArrow
                  titleTextStyle={styles.title}
               />
               <View style={{
                  flex: 1, flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center' ,borderBottomColor: '#cacdd1', borderBottomWidth: 1,marginLeft: 10                  
               }}>
                  <View style={{flex: 1}}>
                     <Text style={styles.title}>Location</Text>
                  </View>
                  <LocationSearch  
                     placeholder="Street name" 
                     defaultValue={this.state.location.description}
                     handleSelectLocation={this.handleSelectLocation}
                     submitLocationDescription={this.submitLocationDescription} 
                     containerStyle={{
                        width: '100%', flex: 3
                     }}
                     textAlign='right'
                     noBorder
                  />

               </View>

               <ListItem 
                  title='Street address'
                  placeholder="Street address" 
                  rightTitle={this.state.location.street}
                  noArrow
                  titleTextStyle={styles.title}
               />

               <ListItem 
                  title='City'
                  placeholder="City" 
                  rightTitle={this.state.location.city}
                  noArrow
                  titleTextStyle={styles.title}
               />

               <ListItem 
                  title='Country'
                  placeholder="Country" 
                  rightTitle={this.state.location.country}
                  noArrow
                  titleTextStyle={styles.title}
               />
               
               <ListItem 
                  title='House number'
                  placeholder="House number" 
                  textInputValue={this.state.location.houseNumber}
                  onChangeText={(houseNumber) => this.setState({ location: {...this.state.location, houseNumber} })}
                  returnKeyType='next'
                  reference={input => this.inputs['houseNumber'] = input}
                  onSubmitEditing={() => this.handleFocusNextField('postalCode')}
                  noArrow
                  titleTextStyle={styles.title}
                  />
               <ListItem 
                  title='Postal code'
                  placeholder="Postal Code"
                  textInputValue={this.state.location.postalCode} 
                  keyboardType="numeric"
                  onChangeText={(postalCode) => this.setState({ location: {...this.state.location, postalCode} })} 
                  returnKeyType='done'
                  reference={input => this.inputs['postalCode'] = input}
                  noArrow
                  titleTextStyle={styles.title}
                  />
               {
                  this.state.location.description
                  ?
                  <View style={{flex:1}}>
                     <View style={styles.mapView}>
                        <View style={styles.noteContainer}>
                           <Text style={styles.note}>Tap on the map to view full-screen</Text>  
                        </View>        
                        <Map 
                           location={this.state.location} 
                           scrollEnabled={false}
                           onPress={() => this.props.navigation.navigate('MapFullScreen', {
                              location: this.state.location,
                           })}
                           style={{ height: 300,zIndex: 1 }} />
                     </View>
                  </View>
                  : null
               }
            </ScrollView>
         </Animated.View>
      );
   }
}

const styles = {
   container: {
      flex: 1,
   },
   mapView: {
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
         width: 2,
         height: 4
      },
      shadowOpacity: 0.1,
      position: 'relative'
   },
   noteContainer: {
      position: 'absolute',
      top: 3,
      left: 3,
      // set bigger zIndex than one on the map style
      // to make text appears above the map
      zIndex: 1000,
   },
   note: {
      color: 'grey',
      fontSize: 15,
      backgroundColor: 'white',
      paddingTop: 5,
      paddingLeft: 5,
      opacity: 0.7
   },
   title: {
      fontSize: 18,
      fontWeight: '500',
   },
}

export default connect(null, actions)(ProfileEdit);



   