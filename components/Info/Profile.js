import React, { Component } from 'react';
import { ScrollView, Button, View, Text, KeyboardAvoidingView, Animated, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ViewContainer from '../UI/View';
import Input from '../UI/Input';
import LocationSearch from '../Location/LocationSearch';
import Map from '../Location/Map';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import Modal from '../UI/Modal';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';
import alertMessage from '../UI/alertMessage';

class Profile extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Profile" />,
         headerLeft: <HeaderLeftTitle navigation={navigation}/>,
         headerRight: <HeaderRightTitle 
                        saveInfo={navigation.getParam('saveInfo')} />,
         headerStyle: {
            backgroundColor: '#1a4b93'
         }
      }
   }

   constructor(props) {
      super(props);
      this.state = {
         firstName: '',
         lastName: '',
         location: {
            detail: '',
            lat: '',
            lng: '',
            houseNumber: '',
            postalCode: ''
         },
         isLoading: true,
         isSaving: false,
         isMapFullScreen: false,
      };
      this.keyboardHeight = new Animated.Value(0);
      this.inputs = {};
   }

   // add event listener for keyboard to show up
   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
      // allowing header right button 
      // to get access to function inside class
      this.props.navigation.setParams({
         saveInfo: this.handleSaveInfo
      });

   }

   componentWillUnmount() {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
   }
   
   // componentDidMount() {
   //    this.props.navigation.setParams({ saveInfo: this.handleSaveInfo });
   // }

   // callbacks
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

   componentDidMount() {
      this.loadData();
   }
   
   handleSaveInfo = () => {
      this.setState({ isSaving: true })
      const { firstName, lastName, location } = this.state;
      this.props.saveData(firstName, lastName, location, () => {
         alertMessage();
         this.setState({ isSaving: false, isModalShowed: true });
         this.loadData();         
      });
   }

   loadData = () => {
      this.props.loadData(() => {
         console.log(this.props)
         const { firstName, lastName, location } = this.props;
         this.setState({ ...this.state, firstName, lastName, location, isLoading: false })
      });
   }

   handleSelectLocation = (lat, lng) => {
      this.setState({ location: {...this.state.location, lat, lng } });
   }

   submitLocationDescription = (description) => {
      this.setState({ location: {...this.state.location, description }})
   }

   handleFocusNextField = (fieldID) => {
      this.inputs[fieldID].focus();
   }

   render() {
      // console.log(this.state.location)
      // console.log(this.state.location.description)
      // show map full screen when user tap the map 
      if(this.state.isLoading) {
         return (
            <Modal title="Loading your profile" />
         )
      }
      return(
         <View style={{flex:1}}>
         <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight } ]}>
            {
               this.state.isSaving
               ?
               <Modal title="Saving your information" />
               :
               <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                  <ViewContainer>
                     <View style={[styles.headingContainer, { marginTop: 15 }]}>
                        <Ionicons name="ios-information-circle-outline" size={25} />               
                        <Text style={styles.heading}>Basic information</Text>
                     </View>
                     <Input 
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChangeText={(firstName) => this.setState({ firstName })}
                        style={{ marginTop: 10}}
                        returnKeyType='next'
                        reference={input => this.inputs['firstName'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('lastName')} />
                     <Input 
                        placeholder="Last Name"
                        value={this.state.lastName}                  
                        onChangeText={(lastName) => this.setState({ lastName })}
                        returnKeyType='next'
                        reference={input => this.inputs['lastName'] = input}
                        // onSubmitEditing={() => this.handleFocusNextField('lastName')}
                        />

                     <View style={[styles.headingContainer, {marginTop: 20}]}>
                        <Ionicons name="ios-home" size={25} />               
                        <Text style={styles.heading}>Home address</Text>                  
                     </View>
                     <View>
                        <LocationSearch  
                           placeholder="Adress" 
                           defaultValue={this.state.location.description}
                           handleSelectLocation={this.handleSelectLocation}
                           submitLocationDescription={this.submitLocationDescription} />
                        <Input 
                           placeholder="House number" 
                           value={this.state.location.houseNumber}
                           onChangeText={(houseNumber) => this.setState({ location: {...this.state.location, houseNumber} })}
                           returnKeyType='next'
                           reference={input => this.inputs['houseNumber'] = input}
                           onSubmitEditing={() => this.handleFocusNextField('postalCode')}
                           />
                     </View>
                     <View>
                        <Input 
                           placeholder="Postal Code"
                           value={this.state.location.postalCode} 
                           keyboardType="numeric"
                           onChangeText={(postalCode) => this.setState({ location: {...this.state.location, postalCode} })} 
                           returnKeyType='done'
                           reference={input => this.inputs['postalCode'] = input}
                           />
                     </View>
                     {
                        this.state.location.description
                        ?
                        <View style={{flex:1}}>
                           <View style={[styles.headingContainer, {marginTop: 20, marginBottom: 20}]}>
                              <Ionicons name="ios-map" size={25} />               
                              <Text style={styles.heading}>Map</Text>        
                           </View>
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
                     
                  </ViewContainer>
                  
               </ScrollView>
            }
         </Animated.View>
         </View>
      );
   }
}

const styles = {
   container: {
      flex: 1,
   },
   headingContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   heading: {
      fontSize: 20,
      marginBottom: 0,
      marginLeft: 5,
      paddingBottom: 0,
      fontWeight: 'bold',
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
      paddingTop: 5, paddingLeft: 5,
      opacity: 0.7
   }
}

const mapStateToProps = ({ data }) => {
   return {
      firstName: data.firstName,
      lastName: data.lastName,
      location: data.location
   }
}

export default connect(mapStateToProps, actions)(Profile);