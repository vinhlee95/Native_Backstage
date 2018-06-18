import React, {Component} from 'react';
import {Modal, Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../UI/Button';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class AddModal extends Component {
   render() {
      return(
         <View 
            style={[styles.modal, 
                     this.props.isModalShowed 
                     ? 
                     {backgroundColor: 'rgba(255,255,255,0.8)'} 
                     : '']} >
            <Modal
               animationType="slide"
               transparent={true}
               visible={this.props.isModalShowed}
               onDismiss={() => console.log('Modal is closed!')} >
               <View style={styles.optionContainer}>
                  <View style={styles.row}>
                     <Text style={styles.text}>Performer</Text>
                     <Icon name="user" size={30} color="red" style={styles.icon} />
                  </View>
                  <View style={styles.row}>
                     <Text style={styles.text}>Performance</Text>
                     <Icon name="gift" size={30} color="red" style={styles.icon} />
                  </View>
                  <Button 
                     title="Cancel" 
                     style={{ backgroundColor: 'red'}}
                     onPress={() => this.props.handleCloseModal()} />

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
      bottom: DEVICE_HEIGHT/4, 
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
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: '#dee2e8',
      shadowColor: '#1a4b93',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 2,
   },
   text: {
      fontSize: 16,
      fontWeight: 'bold'
   },
   icon: {
      marginLeft: 10,
   }
}

export default AddModal;