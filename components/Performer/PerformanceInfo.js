import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Keyboard, Animated, WebView, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Swiper from 'react-native-swiper';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';
import Tag from '../UI/Tag';
import Spinner from '../UI/Spinner';
import { Ionicons } from '@expo/vector-icons';

import _ from 'lodash';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';
import alertMessage from '../UI/alertMessage';

import { connect } from 'react-redux';
import * as actions from '../../actions';

const DEVICE_WIDTH = Dimensions.get('window').width;

class PerformanceInfo extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Edit performance" />,
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
      const {performanceData,} = this.props.navigation.state.params;
      const {
         title,
         description,
         performerData,
         productImage,
         audienceSize,
         audio,
         duration,
         carToDoor,
         electricity,
         price,
         id
      } = performanceData;
      console.log(`You are accessing an item with id of ${id}`)
      // console.log(audio)
      const { name } = performerData;
      let image = performanceData.image ? performanceData.image : null;
      // console.log(this.props.navigation.state.params.performanceData)
      // console.log(performerData)
      this.state = {
         title,
         description,
         name,
         image,
         id,
         tagData: {
            audienceSize,
            audio,
            duration,
            carToDoor,
            electricity,
            price
         },
      };
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
      const { name, title, description, tagData, image, id } = this.state;
      this.props.updatePerformance(name, title, description, tagData, image, id);           
      // display save modal
      alertMessage(() => this.props.navigation.goBack());
   }

   handleDeletePerformance = () => {
      const { id } = this.state;
      Alert.alert(
         'Delete performance',
         'Are you sure to delete this performance?',
         [
            {text: 'Cancel'},
            {text: 'Ok', onPress: () => {
               this.props.deletePerformance(id);
               this.props.navigation.goBack();
            }}
         ],
         { cancelable: true }
      )
   }

   pickImage = async () => {
      this.setState({
         isLoading: true
      })
      const permissions = Permissions.CAMERA_ROLL;
      const {
         status
      } = await Permissions.askAsync(permissions);

      if (status === 'granted') {
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

   renderTagList = () => {
      const { audienceSize, audio, duration, carToDoor, electricity, price } = this.state.tagData;

      let audioTag, carToDoorTag, electricityTag;
      audio?audioTag="Audio":"";
      carToDoor?carToDoorTag="Car to door":"";
      electricity?electricityTag="Electricity":"";

      const data = [
         {
            tagName: `${audienceSize}`,
            tagIonIconName: 'ios-people',
         },
         {
            tagName: `${duration}`,
            tagIonIconName: 'ios-clock',
            tagWidth: 100,
         },
         {
            tagName: `${price}`,
            tagIonIconName: 'ios-pricetag',
            tagWidth: 80,
         },
         {
            tagName: audioTag,
            tagIonIconName: 'ios-musical-note',
            tagWidth: 80,
         },
         {
            tagName: carToDoorTag,
            tagIonIconName: 'ios-car',
            tagWidth: 120,
         },
         {
            tagName: electricityTag,
            tagIconName: 'bolt',
            tagWidth: 100,
         },
      ];
      return data.map((tagItem, index) => {
         let hideTag = tagItem.tagName ? false : true;
         const { tagName, tagIonIconName, tagIconName, tagWidth } = tagItem;
         if(tagIonIconName === 'ios-clock') {
            tagItem.tagName += ' mins';
         } else if(tagIonIconName === 'ios-pricetag') {
            tagItem.tagName += ' €';
         }
         return (
            <Tag 
               key={index}
               tagName={tagItem.tagName} 
               tagIonIconName={tagIonIconName}
               tagIconName={tagIconName}
               tagWidth={tagWidth}
               hideTag={hideTag} />
         );
      });
   }

   returnData = (tagData) => {
      this.setState({ tagData })
   }  

   handleFocusNextField = (fieldID) => {
      this.inputs[fieldID].focus();
   }

   render() {
      // console.log(this.state.id)
      const { performanceData } = this.props.navigation.state.params;
      const {productImage} = performanceData;
      // console.log(performanceData)  
      // change media data to array format
		const videoData = _.toArray(performanceData.media);
		videoList = videoData.map(video => {
			const serviceId = video.serviceId;
			return(
				<View style={styles.videoContainer} key={video.id}>
					<WebView
						source={{ uri: `https://www.youtube.com/watch?v=${serviceId}` }}
						style={{ marginTop: 20, height: 380 }}
						scrollEnabled={false}
                  allowsInlineMediaPlayback
                  startInLoadingState
					/>
				</View>
			);
		});
      return(
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={{flex:1, backgroundColor: 'white'}}>
               <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
                  <ScrollView> 
                     <Swiper
                        height={380}
                        loop={false} >   
                        <View style={styles.imageContainer}>                           
                           {
                              productImage || this.state.image
                              ?
                              <Image style={styles.image} source={{uri:productImage?productImage:this.state.image}}/>
                              :
                              <TouchableWithoutFeedback onPress={() => this.pickImage()} >
                                 <View style={styles.imagePickContainer}>
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
                        </View>
                        {videoList}
                     </Swiper>
                     <ViewContainer>
                        <Text style={styles.label}>Performer name</Text>
                        <Input
                           value={this.state.name}
                           onChangeText={name => this.setState({ name })}
                           style={{marginBottom: 25}} 
                           returnKeyType='next'
                           onSubmitEditing={() => this.handleFocusNextField('performanceName')} />
                           />

                        <Text style={styles.label}>Performance name</Text>
                        <Input
                           value={this.state.title}
                           onChangeText={title => this.setState({ title })}
                           style={{marginBottom: 25}} 
                           returnKeyType='next'
                           reference={input => this.inputs['performanceName'] = input}
                           onSubmitEditing={() => this.handleFocusNextField('description')} />
                           />  

                        <Text style={styles.label}>Performance description</Text>
                        <Input
                           value={this.state.description}
                           onChangeText={description => this.setState({ description })}
                           // multiline 
                           returnKeyType='done'
                           reference={input => this.inputs['description'] = input}
                        /> 

                        {/* Tag List */}
                        <Text style={styles.label}>Tags</Text>
                        <View style={styles.tagList}>
                           {this.renderTagList()}
                        </View>

                        <Button 
                           title = {
                              _.toArray(this.state.tagData).every(item => item === null || item === '') ? 'Add tags' : 'Edit tags'
                           }
                           style={styles.editTagButton}
                           onPress={() => this.props.navigation.navigate('TagEdit', {
                              tagData: this.state.tagData,
                              returnData: this.returnData,
                           })}
                        />

                        <Button
                           title="Delete performance"
                           style={{ backgroundColor: '#dd5e3b' }}
                           onPress={this.handleDeletePerformance}
                        />
                     </ViewContainer>
                  </ScrollView>
               </Animated.View> 

         </View>
         </TouchableWithoutFeedback>
      );
   }
}

const styles = {
   imageContainer: {
      marginTop: 10,
      marginBottom: 10,
   },
   image: {
      width: '95%',
      height: 320,
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 'auto'
   },
   imagePickContainer: {
      backgroundColor: 'lightgrey',
      width: 200,
      height: 200,
      borderRadius: 100,
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   videoContainer: { 
		flex: 1,
      height: 320,
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   label: {
      fontSize: 18,
      fontWeight: 'bold'
   },
   tagList: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: DEVICE_WIDTH,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 10, marginBottom: 10,
   },
   editTagButton: {
      width: '30%',
      backgroundColor: '#2d81e2',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 20,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 20,
   }
}

export default connect(null, actions)(PerformanceInfo);