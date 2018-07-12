import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Keyboard, Animated, WebView, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Swiper from 'react-native-swiper';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';
import Tag from '../UI/Tag';
import Spinner from '../UI/Spinner';
import ListItem from '../UI/ListItem';
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
         headerTitle: <HeaderTitle headerTitle={navigation.state.params.performanceData.title} />,
         headerLeft: <HeaderLeftTitle navigation={navigation} />,
         headerRight: <HeaderRightTitle saveInfo={navigation.getParam('saveInfo')} />, 
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
      this.inputs = {};
   }

   // add event listener for keyboard to show up
   componentWillMount() {
      // allowing header right button 
      // to get access to function inside class
      this.props.navigation.setParams({
         saveInfo: this.handleSaveData
      })
   }



   handleSaveData = () => {
      // do sth to save data
      const { name, title, description, tagData, image, id } = this.state;
      this.props.updatePerformance(name, title, description, tagData, image, id);           
      // display save modal
      alertMessage(() => this.props.navigation.goBack());
   }

   handleEditInfo = () => {
      const { title, description, name, id } = this.state;
      this.props.navigation.navigate('PerformanceEdit', {
         title, name, description, id,
         tagData: this.state.tagData,
         returnData: this.returnData,
      });
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

   returnData = (data) => {
      const { title, name, description, tagData } = data;
      this.setState({ title, name, description, tagData });
      console.log(this.state.tagData)
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
         <View style={{flex:1, backgroundColor: 'white'}}>
                  <ScrollView> 
                     {/* <Swiper
                        height={380}
                        loop={false} >    */}
                        <View style={styles.imageContainer}>                           
                           {
                              productImage || this.state.image
                              ?
                              <View>
                                 <Image style={styles.image} source={{uri:productImage?productImage:this.state.image}}/>
                                 <View style={styles.nameContainer}>
                                    <Text style={styles.title}>{this.state.title}</Text>
                                    <Text style={styles.name}>{this.state.name}</Text>
                                 </View>
                                 <Button 
                                    title="Edit" 
                                    style={styles.editButton}
                                    onPress={this.handleEditInfo} />
                              </View>
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
                        {/* {videoList}
                     </Swiper> */}
                     <ViewContainer>
                        {/* <Text style={styles.label}>Performer name</Text> */}
                        {/* <Input
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
                           />   */}
                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'lightgrey'}}>
                           <Text style={styles.label}>About this performance</Text>
                        </View>
                        <Text style={styles.description}>{this.state.description}</Text>
                        {/* <Input
                           value={this.state.description}
                           onChangeText={description => this.setState({ description })}
                           // multiline 
                           returnKeyType='done'
                           reference={input => this.inputs['description'] = input}
                        />  */}

                        {/* Tag List */}
                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'lightgrey'}}>
                        <Text style={styles.label}>Tags</Text>
                        </View>
                        <View style={styles.tagList}>
                           {this.renderTagList()}
                        </View>

                        {/* <Button 
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
                        /> */}
                     </ViewContainer>
                  </ScrollView>

         </View>
      );
   }
}

const styles = {
   imageContainer: {
      marginBottom: 20,
   },
   image: {
      width: '100%',
      height: 320,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
   },
   nameContainer: {
      position: 'absolute', bottom: 20, left: 10,
   },
   editButton: {
      position: 'absolute', bottom: 20, right: 10,
      backgroundColor: 'red', marginTop: 0, marginBottom: 0,
      paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 0,
      borderRadius: 10,
   },
   title: {
      color: 'white', fontSize: 35, fontWeight: '800'
   },
   name: {
      color: 'white', fontSize: 25, fontWeight: '600'
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
      fontSize: 20,
      fontWeight: '600',
      paddingBottom: 5,
   },
   description: {
      fontSize: 16,
      marginTop: 10, marginBottom: 20,
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
}

export default connect(null, actions)(PerformanceInfo);