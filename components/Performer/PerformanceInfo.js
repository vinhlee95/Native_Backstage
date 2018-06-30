import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Keyboard, Animated, WebView, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Input from '../UI/Input';
import Header from '../UI/Header';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';
import SaveModal from '../UI/SaveModal';
import Tag from '../UI/Tag';
import _ from 'lodash';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

const DEVICE_WIDTH = Dimensions.get('window').width;

class PerformanceInfo extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Your performance" />,
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
      const { title, description, performerData, productImage  } = this.props.navigation.state.params.performanceData;
      const {
         audienceSize,
         audio,
         duration,
         carToDoor,
         electricity,
         price
      } = this.props.navigation.state.params.performanceData;
      // console.log(this.props.navigation.state.params.performanceData)
      const { name } = performerData;
      this.state = {
         title,
         description,
         performerName: name,
         tagData: {
            audienceSize,
            audio,
            duration,
            carToDoor,
            electricity,
            price
         },
         showSaveModal: false
      };
      this.keyboardHeight = new Animated.Value(0);
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
      this.setState({ showSaveModal: true })
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

   render() {
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
               <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
                  <ScrollView> 
                     <Swiper
                        height={380}
                        loop={false} >        
                        <View style={styles.imageContainer}>
                           <Image style={styles.image} source={{uri:productImage}}/>
                        </View>
                        {videoList}
                     </Swiper>
                     <ViewContainer>
                        <Text style={styles.label}>Performer name</Text>
                        <Input
                           value={this.state.performerName}
                           onChangeText={performerName => this.setState({ performerName })}
                           style={{marginBottom: 25}} />

                        <Text style={styles.label}>Performance name</Text>
                        <Input
                           value={this.state.title}
                           onChangeText={title => this.setState({ title })}
                           style={{marginBottom: 25}} />  

                        <Text style={styles.label}>Performance description</Text>
                        <Input
                           value={this.state.description}
                           onChangeText={description => this.setState({ description })}
                           multiline /> 

                        {/* Tag List */}
                        <Text style={styles.label}>Tags</Text>
                        <View style={styles.tagList}>
                           {this.renderTagList()}
                        </View>

                        <Button 
                           title="Edit tags"
                           style={styles.editTagButton}
                           onPress={() => this.props.navigation.navigate('TagEdit', {
                              tagData: this.state.tagData,
                              returnData: this.returnData,
                           })}
                        />

                     </ViewContainer>
                  </ScrollView>
                  {
                     this.state.showSaveModal
                     ?
                     <SaveModal 
                        isModalShowed 
                        handleCloseModal={() => this.setState({ showSaveModal: false })}
                     />
                     : null
                  }
               </Animated.View> 

         </View>
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

export default PerformanceInfo;