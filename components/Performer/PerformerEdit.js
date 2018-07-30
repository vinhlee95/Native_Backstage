import React, { Component } from 'react'
import { View, ScrollView, Image, Keyboard, Animated, TouchableWithoutFeedback,  } from 'react-native';
import alertMessage from '../UI/alertMessage';
import ListItem from '../UI/ListItem';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class PerformerEdit extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle='Edit information' />,
         // headerLeft: <HeaderLeftTitle navigation={navigation} />,
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
      const { name, description, profile_facebook, profile_instagram, profilePic, id, productData } = this.props.navigation.state.params; 
      this.state = { name, description, profile_facebook, profile_instagram, profilePic, id, productData };
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
         saveInfo: this.handleSaveData
      });
   }

   handleSaveData = () => {
      const { name, description, profile_facebook, profile_instagram, profilePic, id, productData } = this.state;

      this.props.updatePerformer(name, description, profile_facebook, profile_instagram, profilePic, productData, id);

      const { navigation } = this.props;
      navigation.state.params.returnData(this.state);
      alertMessage(() => navigation.goBack());
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

   handleFocusNextField = (fieldID) => {
      this.inputs[fieldID].focus();
   }

   render() {
      
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={{flex:1}}>
            <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
                  {/* <View style={styles.imageContainer}>
                     <Image source={{uri:imageURI}} style={styles.image} />
                     <Text style={styles.performerName}>{this.state.name}</Text>
                  </View> */}
                  <ScrollView>
                     <ListItem
                        title='Name'
                        placeholder='Name'
                        icon='ios-person-outline'
                        textInputValue={this.state.name}
                        returnKeyType='next'
                        onChangeText={name => this.setState({ name })} 
                        onSubmitEditing={() => this.handleFocusNextField('description')}
                        noArrow
                     />

                     <ListItem
                        title='About me'
                        placeholder='About me'
                        icon='ios-information-circle-outline'
                        textInputValue={this.state.description}
                        returnKeyType='next'
                        onChangeText={description => this.setState({ description })} 
                        reference={input => this.inputs['description'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('facebook')}
                        noArrow
                     />
                     
                     <ListItem
                        title='Facebook'
                        placeholder='Facebook'
                        fontAwesomeIcon = 'facebook-square'
                        textInputValue={this.state.profile_facebook}
                        returnKeyType='next'
                        onChangeText={profile_facebook => this.setState({ profile_facebook })} 
                         reference={input => this.inputs['facebook'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('instagram')}
                        noArrow
                     />

                     <ListItem
                        title='Instagram'
                        placeholder='Instagram'
                        fontAwesomeIcon = 'instagram'
                        textInputValue={this.state.profile_instagram}
                        returnKeyType='done'
                        onChangeText={profile_instagram => this.setState({ profile_instagram })} 
                        reference={input => this.inputs['instagram'] = input}
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
   // imageContainer: {
   //    flex: 1, marginBottom: 10,
   // },
   // image: {
   //    width: '100%',
   //    height: DEVICE_HEIGHT/2,
   //    marginLeft: 'auto',
   //    marginRight: 'auto',
   //    position: 'relative',
   // },
}

export default connect(null, actions)(PerformerEdit);

