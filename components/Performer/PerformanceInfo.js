import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Keyboard, Animated, WebView, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Swiper from 'react-native-swiper';
import Tag from '../UI/Tag';
import Spinner from '../UI/Spinner';
import { Ionicons } from '@expo/vector-icons';

import _ from 'lodash';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import ListItem from '../UI/ListItem';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class PerformanceInfo extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle={navigation.state.params.performanceData.title} />,
         headerLeft: <HeaderLeftTitle navigation={navigation} />,
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

   handleEditInfo = () => {
      const { name, title, description, image, id } = this.state;
      this.props.navigation.navigate('PerformanceEdit', {
         name, title, description, image, id,
         tagData: this.state.tagData,
         returnData: this.returnData,
      });
   }

   returnData = (data) => {
      const { title, name, description, tagData } = data;
      this.setState({ title, name, description, tagData });
      console.log(this.state.tagData)
   }  

   handleDeletePerformance = () => {
      const { id } = this.state;
      Alert.alert(
         'Delete performance',
         'Are you sure to delete this performance?',
         [
            {text: 'Cancel', 'style': 'cancel'},
            {text: 'OK', onPress: () => {
               this.props.deletePerformance(id);
               this.props.navigation.goBack();
            }, 'style': 'destructive'}
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
         <View style={{flex:1}}>
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
               <View>
                  <ListItem
                     title='About this performance'
                     leftTextContent={
                        <Text style={{
                           fontSize: 16,
                        }}>{this.state.description}
                        </Text>
                     }
                     rightContentStyle={{
                        flex: 0
                     }}
                     icon = 'ios-information-circle-outline'
                     iconColor = 'orange'
                     noArrow
                     unTouchable
                  />

                  {/* Tag List */}

                  <ListItem
                     title='Tags'
                     leftTextContent={
                        <View style={styles.tagList}>
                           {this.renderTagList()}
                        </View>
                     }
                     rightContentStyle={{
                        flex: 0
                     }}
                     icon='ios-pricetags-outline' 
                     iconColor='blue'
                     noArrow
                     unTouchable
                  />

                  <View style={{borderBottomWidth: 0.5, borderColor:'#e0e2e5' }}>
                     <ListItem 
                        icon='ios-create-outline'
                        title="Edit performance" 
                        iconColor='green'
                        onPress={this.handleEditInfo} 
                     />
                     <ListItem
                        icon='ios-trash-outline'
                        style={{marginBottom: 10}}
                        titleContainerStyle={{borderBottomWidth:0}}
                        iconColor='red'
                        title='Delete performance'
                        onPress={this.handleDeletePerformance}
                     />
                  </View>
               </View>
            </ScrollView>

         </View>
      );
   }
}

const styles = {
   image: {
      width: '100%',
      height: DEVICE_HEIGHT/2.5,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
   },
   nameContainer: {
      position: 'absolute', bottom: 20, left: 10,
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
   textContainer: {
      backgroundColor: 'white',
      paddingTop: 10, paddingBottom: 10,
   },
   descriptionContainer: {
      borderBottomWidth: 1,
      borderColor: '#e0e2e5',
       paddingBottom: 10,
   },
   description: {
      fontSize: 16,
   },
   tagList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
   },
}

export default connect(null, actions)(PerformanceInfo);