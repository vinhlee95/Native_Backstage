// TODO: required props:
// 1. isModalShowed: bool => showing blur overlay background color
// 2. handleCloseModal: func => function to close modal

import React, {Component} from 'react';
import {Modal, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../UI/Button';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class SaveModal extends Component {
   render() {
      return(
         <View 
            style={[styles.modal, 
                     this.props.isModalShowed 
                     ? 
                     {backgroundColor: 'rgba(0,0,0,0.3)'} 
                     : '']} >
            <Modal
               animationType="fade"
               transparent={true}
               visible={this.props.isModalShowed}
               onDismiss={() => console.log('Modal is closed!')} >
               <View style={styles.banner}>
                  <Text style={styles.heading}>{'Information Saved'.toUpperCase()}</Text>
                  <Text style={styles.message}>Your information has been saved</Text>
                  <TouchableOpacity style={styles.button} onPress={this.props.handleCloseModal}>
                     <Text style={styles.buttonText}>OK</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
         </View>
      );
   }
}

const styles = {
   modal: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      height: DEVICE_HEIGHT,
      width: DEVICE_WIDTH,
   },
   banner: {
      position: 'absolute',
      top: DEVICE_HEIGHT / 3,
      width: '70%',
      left: '15%',
      right: '15%',
      backgroundColor: 'white',
      borderRadius: 10,
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

export default SaveModal;