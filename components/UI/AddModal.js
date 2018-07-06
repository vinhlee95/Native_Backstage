import React, {Component} from 'react';
import {Modal, Text, View, Dimensions, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../UI/Button';
import AddButton from '../UI/AddButton';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class AddModal extends Component {
   render() {
      const {navigation, handleCloseModal, handleShowAddButton} = this.props;
      return(
         <View 
            style={[styles.modal, 
                     this.props.isModalShowed 
                     ? 
                     {backgroundColor: 'rgba(255,255,255,0.8)'} 
                     : '']} >
            <Modal
               animationType="fade"
               transparent={true}
               visible={this.props.isModalShowed}
               onDismiss={() => console.log('Modal is closed!')} >
               <View style={styles.optionContainer}>
                  <TouchableHighlight
                     underlayColor="lightgrey" 
                     onPress={() => {
                        navigation.navigate('PerformerCreate', { navigation: this.props.navigation });
                        handleCloseModal();
                        handleShowAddButton();
                     }}>
                     <View style={styles.row}>
                        <Text style={styles.text}>Performer</Text>
                        <Ionicons name="ios-people" size={30} color="blue" style={styles.icon} />
                     </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                     underlayColor="lightgrey"
                     onPress={() => {
                        navigation.navigate('PerformanceCreate');
                        handleCloseModal();
                        handleShowAddButton();
                     }}>
                     <View style={styles.row}>
                        <Text style={styles.text}>Performance</Text>
                        <Ionicons name="ios-film" size={30} color="red" style={styles.icon} />
                     </View>
                  </TouchableHighlight>
                  <View style={styles.closeButton}>
                     <AddButton 
                        buttonText="x" 
                        onPress={() => {
                           handleCloseModal();
                           handleShowAddButton();
                        }}
                        backgroundColor='red' />
                  </View>

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
   optionContainer: {
      position: 'absolute',
      bottom: 75, 
      right: 20,
   },
   row: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'white',
      marginBottom: 10,
      paddingTop: 10, paddingBottom: 10,
      paddingLeft: 20, paddingRight: 20,
      borderRadius: 25,
      borderWidth: 0.5,
      borderColor: '#dee2e8',
      shadowColor: '#1a4b93',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 2,
   },
   text: {
      fontSize: 18,
      fontWeight: 'bold'
   },
   icon: {
      marginLeft: 10,
   },
   closeButton: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
   }
}

export default AddModal;