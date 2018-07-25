import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Keyboard, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import ViewContainer from '../UI/View';
import alertMessage from '../UI/alertMessage';
import Button from '../UI/Button';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';
import Label from '../UI/Label';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import ListItem from '../UI/ListItem';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class PerformerInfo extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle={navigation.state.params.performerData.name} />,
         // headerLeft: <HeaderLeftTitle navigation={navigation} />,
         headerRight: <HeaderRightTitle 
                        saveInfo={navigation.getParam('saveData')} />,
         headerStyle: {
            backgroundColor: '#1a4b93'
         },
         headerTintColor: 'white'
      }
   }

   constructor(props) {
      super(props);
      const {params} = this.props.navigation.state;
      // get performer data & product data
      const { name, description, profile_facebook, profile_instagram, profilePic, id } = params.performerData; 
      this.productData = params.productData;

      // set state accordingly
      this.state = { 
         name, description, profile_facebook, profile_instagram, profilePic, id 
      };
      this.inputs = {};
   }

   // add event listener for keyboard to show up
   componentWillMount() {
      // allowing header right button 
      // to get access to function inside class
      this.props.navigation.setParams({
         saveData: this.handleSaveData
      });
   }

   handleSaveData = () => {
      const { name, description, profile_facebook, profile_instagram, profilePic, id } = this.state;
      const productData = this.productData;
      this.props.updatePerformer(name, description, profile_facebook, profile_instagram, profilePic, productData, id);
      alertMessage();
   }

   handleEditInfo = () => {
      const { name, description, profile_facebook, profile_instagram } = this.state;
      this.props.navigation.navigate('PerformerEdit', {
         name, description, profile_facebook, profile_instagram,
         returnData: this.returnData
      });
   }

   returnData = (data) => {
      const { name, description, profile_facebook, profile_instagram } = data;
      this.setState({ name, description, profile_facebook, profile_instagram });
   }

   handleFocusNextField = (fieldID) => {
      this.inputs[fieldID].focus();
   }

   render() {
      const { profilePic, description, profile_facebook,profile_instagram } = this.state;
      return (
         <ScrollView>         
            <View style={styles.imageContainer}>
               <Image source={{uri:profilePic}} style={styles.image} />
               <Text style={styles.performerName}>{this.state.name}</Text>
            </View>
            <View>
               {
                  description ? 
                  <View style={styles.textContainer}>
                     <Label title='About' icon='ios-person-outline' iconColor='#3ec1d8'/>
                     <Text style={styles.text}>{this.state.description}</Text> 
                  </View>
                  : null
               }
               
               <ListItem 
                  fontAwesomeIcon='facebook-square'
                  title="Facebook" 
                  rightTitle={this.state.profile_facebook}
                  iconColor='#1d71d3'
                  textStyle={styles.buttonStyle}
                  titleContainerStyle={{borderTopWidth: 1}}
                  noArrow
                  rightContentStyle={{ flex: 2 }}
               />

               <ListItem 
                  fontAwesomeIcon='instagram'
                  title="Instagram" 
                  rightTitle={this.state.profile_instagram}
                  iconColor='#d85936'
                  textStyle={styles.buttonStyle}
                  noArrow
                  rightContentStyle={{ flex: 2 }}
               />

               { /* buttons */ }
               <View style={{ 
                  borderBottomWidth: 0.5, 
                  borderColor:'#e0e2e5',
               }}>
                  <ListItem 
                     icon='ios-create-outline'
                     title="Edit performer" 
                     iconColor='#378cef'
                     textStyle={styles.buttonStyle}
                     onPress={this.handleEditInfo} 
                  />
                  <ListItem
                     icon='ios-trash-outline'
                     titleContainerStyle={{borderBottomWidth:0}}
                     textStyle={styles.buttonStyle}
                     iconColor='red'
                     title='Delete performer'
                     onPress={this.handleDeletePerformance}
                  />
               </View>
            </View>
         </ScrollView>
      )
   }
}

const styles = {
   imageContainer: {
      flex: 1,
   },
   image: {
      width: '100%',
      height: DEVICE_HEIGHT/2,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
   },
   performerName: {
      position: 'absolute',
      bottom: 20, left: 10,
      color: 'white', fontWeight: 'bold', fontSize: 40,
   },
   textContainer: {
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: '2.5%',
   },
   text: {
      fontSize: 16,
      marginLeft: DEVICE_WIDTH/11
   },
   buttonStyle: {
      fontSize: 20,
      fontWeight: '600'
   }
}

export default connect(null, actions)(PerformerInfo);
