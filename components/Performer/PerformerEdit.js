import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Keyboard, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Input from '../UI/Input';
import ViewContainer from '../UI/View';
import alertMessage from '../UI/alertMessage';
import Label from '../UI/Label';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

const DEVICE_HEIGHT = Dimensions.get('window').height;

class PerformerInfo extends Component {
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
      const { name, description, profile_facebook, profile_instagram } = this.props.navigation.state.params; 
      this.state = { name, description, profile_facebook, profile_instagram };
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
         <View style={{flex:1, marginTop: 20}}>
            <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
                  {/* <View style={styles.imageContainer}>
                     <Image source={{uri:imageURI}} style={styles.image} />
                     <Text style={styles.performerName}>{this.state.name}</Text>
                  </View> */}
                  <ScrollView>
                  <ViewContainer>
                     <Label title='Name' icon='ios-person-outline' iconColor='#3ec1d8' />
                     <Input
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })} 
                        returnKeyType='next'
                        onSubmitEditing={() => this.handleFocusNextField('description')}
                        />

                     <Label title='About me' icon='ios-information-circle-outline' iconColor='#3ec1d8' />
                     <Input
                        value={this.state.description}
                        onChangeText={description => this.setState({ description })}
                        // multiline
                        numberOfLines={2} 
                        returnKeyType='next'
                        reference={input => this.inputs['description'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('facebook')}
                        />

                     <Label title='Facebook' fontAwesomeIcon='facebook-square' iconColor='#1d71d3'/>
                     <Input
                        value={this.state.profile_facebook}
                        onChangeText={profile_facebook => this.setState({ profile_facebook })} 
                        returnKeyType='next'
                        reference={input => this.inputs['facebook'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('instagram')}
                        />

                     <Label title='Instagram' fontAwesomeIcon='instagram' iconColor='#d85936' />
                     <Input
                        value={this.state.profile_instagram}
                        onChangeText={profile_instagram => this.setState({ profile_instagram })} 
                        returnKeyType='done'
                        reference={input => this.inputs['instagram'] = input}
                        />
                  </ViewContainer>
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

export default PerformerInfo;
