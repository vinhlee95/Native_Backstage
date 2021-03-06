import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import Spinner from '../UI/Spinner';
import ListItem from '../UI/ListItem';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';
import alertMessage from '../UI/alertMessage';

import * as actions from '../../actions';
import { connect } from 'react-redux';

class PerformerCreate extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="New performer" />,
         headerLeft: <HeaderLeftTitle navigation={navigation} />,
         headerRight: <HeaderRightTitle 
                        saveInfo={navigation.getParam('saveData')} />,
         headerStyle: {
            backgroundColor: '#1a4b93'
         },
      }
   }
   constructor(props) {
      super(props);
      this.state = {
         profilePic: null,
         name: '',
         description: '',
         profile_facebook: '',
         profile_instagram: '',
         isLoading: false,
      };
      this.keyboardHeight = new Animated.Value(0);
      this.inputs = {};
   }

   pickImage = async () => {
      this.setState({ isLoading: true })
      const permissions = Permissions.CAMERA_ROLL;
      const { status } = await Permissions.askAsync(permissions);

      if(status === 'granted') {
         let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
         });
         if (!result.cancelled) {
            this.setState({
               profilePic: result.uri,
               isLoading: false
            });
         }
      } 
   }

   // add event listener for keyboard to show up
   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
      // allowing header right button 
      // to get access to function inside class
      this.props.navigation.setParams({
         saveData: this.handleSaveData
      });
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


   handleSaveData = () => {
      // save data
      const { profilePic, name, description, profile_facebook, profile_instagram } = this.state;
      this.props.createPerformer(profilePic, name, description, profile_facebook, profile_instagram);
      alertMessage(() => this.props.navigation.goBack());
   }

   handleFocusNextField = (fieldID) => {
      this.inputs[fieldID].focus();
   }

   render() {
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={{ flex: 1}}>
            <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
               <ScrollView>
                     {/* Profile upload */}
                     {
                        this.state.profilePic
                        ?
                        <Image
                           source={{ uri: this.state.profilePic }}
                           style={styles.image} />
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
                     
                     <ListItem
                        title='Name'
                        placeholder='Name'
                        textInputValue={this.state.name}
                        icon='ios-person-outline'
                        onChangeText={name => this.setState({ name })}
                        returnKeyType='next'
                        reference={input => this.inputs['name'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('description')}
                        noArrow 
                     />>

                     <ListItem
                        title='About me'
                        placeholder='About me'
                        icon='ios-information-circle-outline'
                        textInputValue={this.state.description}
                        onChangeText={description => this.setState({ description })}
                        reference={input => this.inputs['description'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('facebook')}
                        returnKeyType='next'
                        noArrow
                     />
                     
                     <ListItem
                        title='Facebook'
                        placeholder='Facebook'
                        fontAwesomeIcon = 'facebook-square'
                        textInputValue={this.state.profile_facebook}
                        onChangeText={profile_facebook => this.setState({ profile_facebook })}
                        reference={input => this.inputs['facebook'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('instagram')} 
                        returnKeyType='next'
                        noArrow
                     />

                      <ListItem
                        title='Instagram'
                        placeholder='Instagram'
                        fontAwesomeIcon = 'instagram'
                        textInputValue={this.state.profile_instagram}
                        onChangeText={profile_instagram => this.setState({ profile_instagram })}
                        reference={input => this.inputs['instagram'] = input}
                        returnKeyType='done'
                        noArrow
                     />

               </ScrollView>
            </Animated.View>
         </View>
         </TouchableWithoutFeedback>
      )
   }
}

const styles = {
   image: {
      backgroundColor: 'lightgrey',
      width: 200,
      height: 200,
      borderRadius: 100,
      marginTop: 15, marginBottom: 15,
      marginLeft: 'auto', marginRight: 'auto',
   },
   iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   label: {
      fontSize: 18,
      fontWeight: 'bold'
   }
}

export default connect(null, actions)(PerformerCreate);
