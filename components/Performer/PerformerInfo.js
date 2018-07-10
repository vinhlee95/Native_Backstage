import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Keyboard, Animated, TouchableWithoutFeedback  } from 'react-native';
import Input from '../UI/Input';
import ViewContainer from '../UI/View';
import alertMessage from '../UI/alertMessage';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

class PerformerInfo extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Your information" />,
         headerLeft: <HeaderLeftTitle navigation={navigation} />,
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
      const { name, description, profile_facebook, profile_instagram } = this.props.navigation.state.params.performerData; 
      this.state = { name, description, facebookUrl: profile_facebook, instagramUrl: profile_instagram };
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
         saveData: this.handleSaveData
      });
   }

   handleSaveData = () => {
      alertMessage();
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
      console.log(this.props.navigation.state.params.performerData);
      const { name, profilePic, profileThumb } = this.props.navigation.state.params.performerData;
      let imageURI = profilePic?profilePic:profileThumb;
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={{flex:1, backgroundColor: 'white'}}>
            {/* <Header 
               headerName="Your Information" 
               notShowIcon headerRightTitle="Done"
               navigateBack={() => this.props.navigation.goBack()} /> */}
            <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
               <ScrollView>         
                  <View style={styles.imageContainer}>
                     <Image source={{uri:imageURI}} style={styles.image} />
                  </View>
                  <ViewContainer>
                     <Text style={styles.label}>Performer name</Text>
                     <Input
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })} 
                        returnKeyType='next'
                        onSubmitEditing={() => this.handleFocusNextField('description')}
                        />

                     <Text style={styles.label}>Performer description</Text>
                     <Input
                        value={this.state.description}
                        onChangeText={description => this.setState({ description })}
                        // multiline
                        numberOfLines={2} 
                        returnKeyType='next'
                        reference={input => this.inputs['description'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('facebook')}
                        />

                     <Text style={styles.label}>Facebook URL</Text>
                     <Input
                        value={this.state.facebookUrl}
                        onChangeText={facebookUrl => this.setState({ facebookUrl })} 
                        returnKeyType='next'
                        reference={input => this.inputs['facebook'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('instagram')}
                        />

                     <Text style={styles.label}>Instagram URL</Text>
                     <Input
                        value={this.state.instagramUrl}
                        onChangeText={instagramUrl => this.setState({ instagramUrl })} 
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
   imageContainer: {
      flex: 1,
      marginTop: 10, marginBottom: 10,
   },
   image: {
      width: 250,
      height: 250,
      borderRadius: 125,
      marginLeft: 'auto',
      marginRight: 'auto'
   },
   label: {
      fontSize: 18,
      fontWeight: 'bold'
   }
}

export default PerformerInfo;
