import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const Header = (props) => {
   return(
      <View style={styles.header}>
         <Text style={styles.headerText}>{props.headerName}</Text>
         {
            !props.notShowIcon
            ?
            <Icon name="user" size={30} onPress={() => props.navigation.navigate('account', { goBackKey: props.goBackKey})} />
            : null
         }
         {
            props.showDone
            ?
            <Text 
               style={styles.done} 
               onPress={() => props.navigateBack()}
                >Done</Text>
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
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      paddingTop: 40,
      paddingBottom: 15,
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: '#eff3f9',      
   },
   headerText: {
      fontSize: 30,
      fontWeight: 'bold'
   },
   done: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'red',
      paddingRight: 10,
      marginTop: 10,
   }
}

export default Header;