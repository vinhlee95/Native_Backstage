import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Banner = (props) => {
   return(
      <View style={styles.backdrop}>
         <View style={styles.banner}>
            <Text style={styles.heading}>{'Information Saved'.toUpperCase()}</Text>
            <Text style={styles.message}>Your information has been saved</Text>
            <TouchableOpacity style={styles.button} onPress={props.handleCloseModal}>
               <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}

const styles = {
   backdrop: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT,
      backgroundColor: 'rgba(0,0,0, .3)',
   },
   banner: {
      position: 'absolute',
      top: DEVICE_HEIGHT/2.5,
      width: '80%',
      left: '10%',
      right: '10%',
      backgroundColor: 'white',
      borderRadius: 5,
      paddingTop: 20
   },
   heading: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 5,
   },
   message: {
      fontSize: 16,
      textAlign: 'center',
      paddingBottom: 20,
   },
   button: {
      flex: 1,
      borderTopWidth: .5,
      borderTopColor: '#cacdd1',
      paddingTop: 10,
      paddingBottom: 10,
   },
   buttonText: {
      color: '#2b6edb',
      textAlign: 'center',    
      fontWeight: 'bold',
      fontSize: 18
   }
}

export default Banner;