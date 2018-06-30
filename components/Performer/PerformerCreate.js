import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import SaveModal from '../UI/SaveModal';
import ViewContainer from '../UI/View';
import Spinner from '../UI/Spinner';
import Input from '../UI/Input';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

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
         image: null,
         name: '',
         description: '',
         facebookUrl: '',
         instagramUrl: '',
         isLoading: false,
         isSaving: false,
      };
      this.keyboardHeight = new Animated.Value(0);
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
               image: result.uri,
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
      // do sth to save data
      // display save modal
      this.setState({ isSaving: true })
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: 'white'}}>
            <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
               <ScrollView>
                  <ViewContainer>
                     {/* Profile upload */}
                     {
                        this.state.image
                        ?
                        <Image 
                           source={{ uri: this.state.image }}
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
                                    <Text>Add photo</Text>
                                 </View>
                              }
                           </View>
                        </TouchableWithoutFeedback>
                     }

                     <Text style={styles.label}>Name</Text>
                     <Input
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })} />

                     <Text style={styles.label}>Description</Text>
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
                  </ViewContainer>
                  {
                     this.state.isSaving
                     ?
                     <SaveModal 
                        isModalShowed 
                        handleCloseModal={() => this.setState({ isSaving: false })}
                     />
                     : null
                  }
               </ScrollView>
            </Animated.View>
         </View>
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
      fontSize: 16,
      fontWeight: 'bold'
   }
}

export default PerformerCreate;
