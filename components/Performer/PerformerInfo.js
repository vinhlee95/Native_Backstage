import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Keyboard, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import ViewContainer from '../UI/View';
import alertMessage from '../UI/alertMessage';
import Button from '../UI/Button';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';
import Label from '../UI/Label';

import { connect } from 'react-redux';
import * as actions from '../../actions';

const DEVICE_HEIGHT = Dimensions.get('window').height;

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
      console.log(params.performerData)
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
      const { profilePic } = this.state;
      return (
         <ScrollView style={{backgroundColor:'white'}}>         
            <View style={styles.imageContainer}>
               <Image source={{uri:profilePic}} style={styles.image} />
               <Text style={styles.performerName}>{this.state.name}</Text>
            </View>
            <ViewContainer>
               <Label title='About me' icon='ios-person-outline' iconColor='#3ec1d8'/>
               <Text style={styles.text}>{this.state.description}</Text>

               <Label title='Facebook' fontAwesomeIcon='facebook-square' iconColor='#1d71d3' />
               <Text style={styles.text}>{this.state.profile_facebook}</Text>

               <Label title='Instagram' fontAwesomeIcon='instagram' iconColor='#d85936' />
               <Text style={styles.text}>{this.state.profile_instagram}</Text>

               { /* buttons */ }
               <View style={{ marginTop: 10, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor:'#e0e2e5' }}>
                  <Button 
                     icon='ios-create-outline'
                     title="Edit performer" 
                     iconColor='#378cef'
                     textStyle={styles.buttonStyle}
                     onPress={this.handleEditInfo} 
                  />
                  <Button
                     icon='ios-trash-outline'
                     titleContainerStyle={{borderBottomWidth:0}}
                     textStyle={styles.buttonStyle}
                     iconColor='red'
                     title='Delete performer'
                     onPress={this.handleDeletePerformance}
                  />
               </View>
            </ViewContainer>
         </ScrollView>
      )
   }
}

const styles = {
   imageContainer: {
      flex: 1, marginBottom: 10,
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
   text: {
      fontSize: 16,
      marginBottom: 10,
   },
   buttonStyle: {
      fontSize: 20,
      fontWeight: '600'
   }
}

export default connect(null, actions)(PerformerInfo);
