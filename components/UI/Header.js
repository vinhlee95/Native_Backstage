import React from 'react';
import {View, Text, Image, TouchableHighlight, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const Header = (props) => {
   return(
      <View style={[styles.header, props.headerStyle]}>
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
            props.headerRightTitle
            ?
            <Text 
               style={styles.done} 
               onPress={() => props.navigateBack()}
                >{props.headerRightTitle}</Text>
            : null
         }
      </View>
   );
}

const styles = {
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: DEVICE_HEIGHT/8,
      borderBottomColor: '#cacdd1',
      borderBottomWidth: 0.5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      paddingTop: 40,
      paddingBottom: 15,
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: '#1a4b93',
   },
   headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
   },
   done: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ed3838',
      paddingRight: 10,
      marginTop: 10,
   }
}

export default Header;