import React, { Component } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewContainer from '../UI/View';
import Header from '../UI/Header';
import Input from '../UI/Input';
import Button from '../UI/Button';
import LocationSearch from '../Location/LocationSearch';
import Map from '../Location/Map';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import firebase from 'firebase';
import Banner from '../UI/Banner';
import Spinner from '../UI/Spinner';

class Profile extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         header: null,
         tabBarIcon: ({ focused, tintColor }) => (
         focused
         ?
         <Icon name="user" size={24} color="#2b6edb" />
         :
         <Icon name="user" size={24} />
         ),
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
         isBannerShowed: false,
         isSpinnerShowed: false,
         isMapFullScreen: false,
         isHeaderShowed: true,
         headerTitleRight: 'Done'
      };
      this.keyboardHeight = new Animated.Value(0);
   }

   // add event listener for keyboard to show up
   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
   }

   componentWillUnmount() {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
   }

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
      this.setState({ isLoading: true })
      const { firstName, lastName, location } = this.state;
      this.props.saveData(firstName, lastName, location, () => {
         this.setState({ isLoading: false, isBannerShowed: true });
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

   render() {
      // console.log(this.state.location.description)
      // show map full screen when user tap the map 
      if(this.state.isMapFullScreen) {
         return (
            <View style={{ flex: 1}}>
                  <View style={{ flex: 1, position: 'absolute', top: 30, left: 15, zIndex: 1000 }}>
                     <Icon name="times-circle" size={30} onPress={() => this.setState({ isMapFullScreen: false, isHeaderShowed: true })} />

                  </View>
               <Map location={this.state.location} />
            </View>
         )
      }
      return(
         <View style={{flex:1}}>
         {
            this.state.isHeaderShowed
            ?
            <Header 
               headerName = "Profile"
               notShowIcon headerRightTitle = {this.state.headerTitleRight}
               navigateBack = {
                  () => this.props.navigation.navigate('Account')
               }
            />
            : null
         }
         
         <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight } ]}>
                   
            {
               this.state.isLoading
               ?
               <Spinner />
               :
               <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                  <ViewContainer>
                     <View style={[styles.headingContainer, { marginTop: 15 }]}>
                        <Icon name="info-circle" size={25} />               
                        <Text style={styles.heading}>Basic information</Text>
                     </View>
                     <Input 
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChangeText={(firstName) => this.setState({ firstName })}
                        style={{ marginTop: 10}} />
                     <Input 
                        placeholder="Last Name"
                        value={this.state.lastName}                  
                        onChangeText={(lastName) => this.setState({ lastName })}
                        />

                     <View style={[styles.headingContainer, {marginTop: 20}]}>
                        <Icon name="map-marker" size={25} />               
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
                           onChangeText={(houseNumber) => this.setState({ location: {...this.state.location, houseNumber} })} />
                     </View>
                     <View>
                        <Input 
                           placeholder="Postal Code"
                           value={this.state.location.postalCode} 
                           keyboardType="numeric"
                           onChangeText={(postalCode) => this.setState({ location: {...this.state.location, postalCode} })} />
                     </View>
                     {
                        this.state.location.description
                        ?
                        <View style={{flex:1}}>
                           <View style={[styles.headingContainer, {marginTop: 20, marginBottom: 20}]}>
                              <Icon name="map" size={25} />               
                              <Text style={styles.heading}>Map</Text>                  
                           </View>
                           <View style={{ flex: 1, shadowColor: '#000', shadowOffset: {width: 2, height: 4}, shadowOpacity: 0.1, }}>
                              <Map 
                                 location={this.state.location} 
                                 scrollEnabled={false}  
                                 onPress={() => this.setState({ isMapFullScreen: true, isHeaderShowed: false })}
                                 style={{ height: 300, marginBottom: 70 }} />
                           </View>
                        </View>
                        : null
                     }
                     
                  </ViewContainer>
                  
               </ScrollView>
            }
            {
               this.state.isBannerShowed 
               ? 
               <Banner handleCloseModal={() => this.setState({ isBannerShowed: false })} />
               : null
            }
         </Animated.View>
         {
            !this.state.isSpinnerShowed
            ?
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
            : null
            }
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
      justifyContent: 'flex-start'
   },
   heading: {
      fontSize: 20,
      marginBottom: 0,
      marginLeft: 5,
      paddingBottom: 0,
      fontWeight: 'bold',
   },
}

const mapStateToProps = ({ data }) => {
   return {
      firstName: data.firstName,
      lastName: data.lastName,
      location: data.location
   }
}

export default connect(mapStateToProps, actions)(Profile);