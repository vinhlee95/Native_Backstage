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

const DEVICE_WIDTH = Dimensions.get('window').width;

class PerformanceInfo extends Component {
   constructor(props) {
      super(props);
      const { title, description, performerData, productImage  } = this.props.navigation.state.params.performanceData;
      const { name } = performerData;
      this.state = {
         title,
         description,
         performerName: name,
         showSaveModal: false
      };
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

   handleSaveData = () => {
      // do sth to save data
      // display save modal
      this.setState({ showSaveModal: true })
   }



   render() {
      const productImage = this.props.navigation.state.params.performanceData.productImage;
      const {performanceData} = this.props.navigation.state.params;
      // console.log(performanceData);
      const performanceDuration = `${performanceData.duration} mins`;
      const price = `${performanceData.price} €`;
      let videoList;
      
		const videoData = _.toArray(this.props.navigation.state.params.performanceData.media);
		videoList = videoData.map(video => {
			const serviceId = video.serviceId;
			return(
				<View style={styles.videoContainer} key={video.id}>
					<WebView
						source={{ uri: `https://www.youtube.com/watch?v=${serviceId}` }}
						style={{ marginTop: 20, height: 380 }}
						scrollEnabled={false}
						allowsInlineMediaPlayback
					/>
				</View>
			);
		});
      return(
         <View style={{flex:1, backgroundColor: 'white'}}>
            <Header
               headerName="Your performance"
               headerStyle={{ paddingBottom: 5 }}
               notShowIcon headerRightTitle="Done"
               navigateBack={() => this.props.navigation.goBack()} />
               <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
                  <ScrollView> 
                     <Swiper height={380}>        
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
                           <Tag tagName={performanceData.audienceSize} tagIonIconName="ios-people" />
                           {
                              performanceData.audio
                              ?
                              <Tag tagName="Audio" tagIonIconName="ios-musical-note" tagWidth={80} />
                              : null
                           }
                           <Tag tagName={performanceDuration} tagIonIconName="ios-clock" tagWidth={100} />
                           {
                              performanceData.carToDoor
                              ?
                              <Tag tagName="Car to door" tagIonIconName="ios-car" tagWidth={120}  />
                              : null
                           }
                           
                           <Tag tagName={price} tagIonIconName="ios-pricetag" tagWidth={80}/>
                           {
                              performanceData.electricity
                              ?
                              <Tag tagName="Electricity" tagIconName="bolt" tagWidth={100} /> 
                              : null                             
                           }
                        </View>
                        <Button 
                           title="Edit tags"
                           style={styles.editTagButton}
                           onPress={() => this.props.navigation.navigate('TagEdit', {
                              audienceSize: performanceData.audienceSize,
                              performanceDuration: performanceData.duration,
                              audio: performanceData.audio,
                              carToDoor: performanceData.carToDoor,
                              price,
                              electricity: performanceData.electricity,
                           })}
                        />

                        <Button title="Save" onPress={() => this.handleSaveData()} />        
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