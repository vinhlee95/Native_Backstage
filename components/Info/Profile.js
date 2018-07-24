import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Modal from '../UI/Modal';
import ListItem from '../UI/ListItem'

import Map from '../Location/Map';

import { connect } from 'react-redux';
import * as actions from '../../actions';

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
      
   }


   componentDidMount() {
      this.loadData();
      this.props.navigation.setParams({
         saveInfo: this.handleSaveInfo
      });
   }

   returnData = (data) => {
      const { firstName, lastName, location } = data;
      this.setState({
         firstName, lastName, location
      })
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
         // console.log(this.props)
         const { firstName, lastName, location } = this.props;
         const des = location.description;
         const des_in_array = des.split(',');
         const street = des_in_array.slice(0, 1).join(' ');
         const city = des_in_array.slice(1, 2).join(' ');
         const country = des_in_array.slice(2, 3).join(' ');
         this.setState({ ...this.state, firstName, lastName, location: {
            ...location, street, city, country
         }, isLoading: false })
      });
   }

   render() {
      const { firstName, lastName, location } = this.state;
      const { lat, lng, description, houseNumber, postalCode } = location;
      // change latitudeDelta and longitudeDelta 
      // for small map picture
      const mapThumb = {
         lat, lng,
         latDelta: 0.001,
         lngDelta: 0.002
      }

      // get full location description for rendering in location list item
      let des = description ? description : '';
      let des_in_array = des.split(',')
      // add house number & postal code to the existing description
      des_in_array.splice(1, 0, houseNumber);
      des_in_array.splice(2, 0, postalCode);
      let fullDescription = des_in_array.join(',')

      if(this.state.isLoading) {
         return (
            <Modal title="Loading your profile" />
         )
      }
      return(
         <ScrollView style={{flex:1}}>
            <ListItem
               title='First Name'
               rightTitle={this.state.firstName}
               noArrow
               titleTextStyle={styles.title}
            />

            <ListItem
               title='Last Name'
               rightTitle={this.state.lastName}
               noArrow
               titleTextStyle={styles.title}
            />

            <TouchableOpacity
               onPress={() => this.props.navigation.navigate('MapFullScreen', {
                  location: this.state.location
               })}
            >
                  <View style={styles.content}>
                     <View style={styles.leftCol}>
                        <View style={styles.titleContainer}>
                           <Text style={[styles.title, {marginBottom: 10}]}>Location</Text>
                           <Text style={styles.text}>{fullDescription}</Text>
                        </View>
                     </View>
                     <View style={styles.rightCol}>
                        <Map
                           style={{ width: 100, height: 100, borderRadius: 5 }}
                           location={mapThumb}
                        />
                        <Ionicons name='ios-arrow-forward' size={25}
                           color='#e0e2e5'
                           style={{marginLeft: 5}} />
                     </View>
                  </View>
            </TouchableOpacity>
            <ListItem 
               title="Edit profile" 
               titleTextStyle={styles.title}
               borderTopWidth={1}
               onPress={() => this.props.navigation.navigate('ProfileEdit', {
                  profileData: { firstName, lastName, location },
                  returnData: this.returnData
               }) } 
            />
         </ScrollView>
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
      paddingTop: 5, paddingLeft: 5,
      opacity: 0.7
   },

   title: {
      fontSize: 18,
      fontWeight: '500',
   },

   content: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 10, paddingBottom: 10, paddingRight: 5,
      backgroundColor: 'white',
   },
   leftCol: {
      flexDirection: 'row', flex: 2,
   },
   titleContainer: {
      width: '80%', marginLeft: 10
   },
   text: { fontSize: 16 },
   rightCol: {
      flexDirection: 'row', flex: 1,
      alignItems: 'center',

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