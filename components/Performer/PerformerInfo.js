import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Keyboard, Animated } from 'react-native';
import Modal from '../UI/Modal';
import Header from '../UI/Header';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

class PerformerInfo extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Your information" />,
         headerLeft: <HeaderLeftTitle navigation={navigation} />,
         headerRight: <HeaderRightTitle headerRightTitle="Done" />,
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

   render() {
      console.log(this.props.navigation.state.params.performerData);
      const { name, profilePic } = this.props.navigation.state.params.performerData;
      return (
         <View style={{flex:1, backgroundColor: 'white'}}>
            {/* <Header 
               headerName="Your Information" 
               notShowIcon headerRightTitle="Done"
               navigateBack={() => this.props.navigation.goBack()} /> */}
            <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
               <ScrollView>         
                  <View style={styles.imageContainer}>
                     <Image source={{uri:profilePic}} style={styles.image} />
                  </View>
                  <ViewContainer>
                     <Text style={styles.label}>Performer name</Text>
                     <Input
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })} />

                     <Text style={styles.label}>Performer description</Text>
                     <Input
                        value={this.state.description}
                        onChangeText={description => this.setState({ description })}
                        // multiline
                        numberOfLines={2} />

                     <Text style={styles.label}>Facebook URL</Text>
                     <Input
                        value={this.state.facebookUrl}
                        onChangeText={facebookUrl => this.setState({ facebookUrl })} />

                     <Text style={styles.label}>Instagram URL</Text>
                     <Input
                        value={this.state.instagramUrl}
                        onChangeText={instagramUrl => this.setState({ instagramUrl })} />
                     <Button title="Save" onPress={() => this.props.navigation.goBack()}/>                     
                  </ViewContainer>
               </ScrollView>
            </Animated.View>
         </View>
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
      fontSize: 16,
      fontWeight: 'bold'
   }
}

export default PerformerInfo;
