import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Keyboard, Animated, WebView } from 'react-native';
import Swiper from 'react-native-swiper';
import Input from '../UI/Input';
import Header from '../UI/Header';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';
import _ from 'lodash';

class PerformanceInfo extends Component {
   constructor(props) {
      super(props);
      const { title, description, performerData, productImage  } = this.props.navigation.state.params.performanceData;
      const { name } = performerData;
      this.state = {
         title,
         description,
         performerName: name
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

   render() {
      const productImage = this.props.navigation.state.params.performanceData.productImage;
		console.log(_.toArray(this.props.navigation.state.params.performanceData.media));
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
                           onChangeText={performerName => this.setState({ performerName })} />

                        <Text style={styles.label}>Performance name</Text>
                        <Input
                           value={this.state.title}
                           onChangeText={title => this.setState({ title })} />     

                        <Text style={styles.label}>Performance description</Text>
                        <Input
                           value={this.state.description}
                           onChangeText={description => this.setState({ description })}
                           multiline />    

                        <Button title="Save" onPress={() => this.props.navigation.goBack()} />        
                     </ViewContainer>
                  </ScrollView>
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
      fontSize: 16,
      fontWeight: 'bold'
   }
}

export default PerformanceInfo;