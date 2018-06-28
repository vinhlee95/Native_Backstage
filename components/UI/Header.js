import React from 'react';
import {View, Text, Image, TouchableHighlight, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const Header = (props) => {
   return(
      <View style={[styles.header, props.headerStyle]}>
         {
            props.editMode
            ?
            <TouchableWithoutFeedback onPress={() => props.navigateBack()}>
               <View>
                  <Text style={styles.headerButtonLeft}>Cancel</Text>
               </View>
            </TouchableWithoutFeedback>
            : null
         }
         <Text style={styles.headerText}>{props.headerName}</Text>
         {
            !props.notShowIcon
            ?
            <TouchableHighlight onPress={() => props.onPress()}  >
               <Image
                  source={require('../../images/profile.png')}
                  style={{
                     width: 35,
                     height: 35,
                     borderRadius: 17.5,
                     paddingRight: 5,
                  }}
               />
            </TouchableHighlight>
            : null
         }
         {
            props.editMode
            ?
            <Text 
               style={styles.headerButtonRight} 
               onPress={() => props.handleSaveInfo()}
                >Done</Text>
            : null
         }
         {
            props.headerRightTitle
            ?
            <Text
               style={styles.headerButtonRight}
               onPress={() => props.navigateBack()}
               >{props.headerRightTitle}</Text>
            :null
         }
         
      </View>
   );
}

const styles = {
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: DEVICE_HEIGHT/8.5,
      borderBottomColor: '#cacdd1',
      borderBottomWidth: 0.5,
      shadowColor: '#1a4b93',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      paddingTop: 20,
      paddingBottom: 5,
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: '#1a4b93',
   },
   headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
   },
   headerButtonRight: {
      fontSize: 20,
      color: 'white',
      paddingRight: 10,
      marginTop: 5,
   },
   headerButtonLeft: {
      fontSize: 20,
      color: '#e83c3c',
      marginTop: 5,
      paddingLeft: 10,
   }
}

export default Header;