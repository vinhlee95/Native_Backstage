import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Alert, Dimensions, TouchableWithoutFeedback } from 'react-native';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';
import ListItem from '../UI/ListItem';
import Spinner from '../UI/Spinner';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import * as actions from '../../actions';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class PerformerInfo extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle={navigation.state.params.performerData.name} />,
         // headerLeft: <HeaderLeftTitle navigation={navigation} />,
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

   handleEditInfo = () => {
      const { name, description, profile_facebook, profile_instagram, profilePic, id } = this.state;
      const productData = this.productData;
      this.props.navigation.navigate('PerformerEdit', {
         name, description, profile_facebook, profile_instagram, profilePic, id, productData,
         returnData: this.returnData
      });
   }

   handleDeletePerformer = () => {
      const { id } = this.state;
      Alert.alert(
         'Delete performance',
         'Are you sure to delete this performer?',
         [
            {text: 'Cancel', 'style': 'cancel'},
            {text: 'OK', onPress: () => {
               this.props.deletePerformer(id);
               this.props.navigation.goBack();
            }, 'style': 'destructive'}
         ],
         { cancelable: true }
      )
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
              {
                profilePic
                ?
                <Image source={{uri:profilePic}} style={styles.image} />
                :
                <TouchableWithoutFeedback onPress={() => this.pickImage()} >
                    <View style={styles.image}>
                      {
                          this.state.isLoading
                          ?
                          <Spinner animating />
                          :
                          <View style={styles.iconContainer}>
                            <Ionicons name="ios-camera" size={60} />
                            <Text>Add profile picture</Text>
                          </View>
                      }
                    </View>
                </TouchableWithoutFeedback>
              }
               <Text style={styles.performerName}>{this.state.name}</Text>
            </View>
            <View>

               {
                  description
                  ?
                  <ListItem
                     title='About'
                     icon='ios-person-outline' 
                     iconColor='#3ec1d8'
                     leftTextContent={
                        <Text style={{ fontSize: 16 }}>{this.state.description}</Text> 
                     }
                     noArrow
                     unTouchable
                  />
                  : null
               }
               
               <ListItem 
                  fontAwesomeIcon='facebook-square'
                  title="Facebook" 
                  rightTitle={this.state.profile_facebook}
                  iconColor='#1d71d3'
                  noArrow
                  unTouchable
                  rightContentStyle={{ flex: 2 }}
               />

               <ListItem 
                  fontAwesomeIcon='instagram'
                  title="Instagram" 
                  rightTitle={this.state.profile_instagram}
                  iconColor='#d85936'
                  noArrow
                  unTouchable
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
                     onPress={this.handleEditInfo} 
                  />
                  <ListItem
                     icon='ios-trash-outline'
                     titleContainerStyle={{borderBottomWidth:0}}
                     iconColor='red'
                     title='Delete performer'
                     onPress={this.handleDeletePerformer}
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
      height: DEVICE_HEIGHT/2.5,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
   },
   performerName: {
      position: 'absolute',
      bottom: 20, left: 10,
      color: 'white', fontWeight: 'bold', fontSize: 40,
   }
}

export default connect(null, actions)(PerformerInfo);
