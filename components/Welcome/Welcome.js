import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Button from '../UI/Button';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const data = [
   { 
      title: 'Welcome to Gigle Backstage', 
      image: require('../../images/Welcome/1.jpg'),
      tip: 'Swipe to learn more',
   },
   { 
      title: 'Manage your gigs',
      subtitle: 'Quickly view your upcoming gigs, right on Dashboard.',
      image: require('../../images/Welcome/2.jpg'),       
   },
   { 
      title: 'Add and modify your performance',
      subtitle: 'Easily add more performer/ performance, and change information inside them.',
      image: require('../../images/Welcome/3.jpg'),      
   },
   {
      title: 'Manage your schedule',
      subtitle: 'Your calendar is here! Quickly set your availability.',
      image: require('../../images/Welcome/4.jpg'),      
   }
];

const dot = <View style = {
               {
                  backgroundColor: 'rgb(255,255,255)',
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 3,
                  marginBottom: DEVICE_HEIGHT/4,
               }
            } />;

const activeDot = <View style = {
                     {
                        backgroundColor: '#454749',
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 3,
                        marginBottom: DEVICE_HEIGHT/4,
                     }
                  }
               />

class Welcome extends Component {
   static navigationOptions = {
      header: null,
   }

   renderSlides = () => {
      return data.map((slide, id) => {
         let tip = slide.tip ? slide.tip : null;
         let buttonText = id === data.length-1 ? `I'm ready` : 'Skip';
         let subtitle = slide.subtitle ? slide.subtitle : null;
         return(
            <View
               key={id}
               style={styles.slide} >
               <View style={styles.titleBlock}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.subtitle}>{subtitle}</Text>
               </View>
               <Image
                  source={slide.image}
                  style={styles.image}
               />
               <Text style={styles.tip}>{tip}</Text>
               <Button 
                  title={buttonText} 
                  onPress={() => this.props.navigation.navigate('Signup')}
                  style={styles.button} />
            </View>
         );
      });
   }

   render() {
      return(
         <Swiper
            dot={dot}
            activeDot={activeDot} >
            {this.renderSlides()}
         </Swiper>
      ); 
   }
}

const styles = {
   slide: {
      flex: 1,
      width: DEVICE_WIDTH,
      justifyContent:'center',
      alignItems: 'center',
      paddingBottom: DEVICE_WIDTH/5,
   },
   image: {
      width: DEVICE_WIDTH, 
      height: DEVICE_HEIGHT,
      position: 'absolute',
      zIndex: 0,
      alignSelf: 'stretch',
      opacity: 0.8
   },
   titleBlock: {
      width: '80%',
      backgroundColor: 'rgba(255,255,255,0.7)',
      marginLeft: 'auto', marginRight: 'auto',
      borderRadius: 10,
      paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10,
      zIndex: 1,
   },
   title: {
      fontSize: 30,
      textAlign: 'center'
   },
   subtitle: {
      fontSize: 18,
      marginTop: 10,
      textAlign: 'center'
   },
   tip: {
      fontSize: 20,
      color: 'white',
      position: 'absolute',
      bottom: DEVICE_HEIGHT/4.5,
   },
   button: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: DEVICE_WIDTH,
      marginBottom: 0,
      marginTop: 20,
      backgroundColor: 'rgba(66, 73, 84, 0.9)'
   }
}

export default Welcome;