import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const Header = (props) => {
   return(
      <View style={styles.header}>
         <Text style={styles.headerText}>{props.headerName}</Text>
         <Icon name="user" size={30} />
      </View>
   );
}

const styles = {
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: DEVICE_HEIGHT/10,
      borderBottomColor: '#cacdd1',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      paddingTop: 25,
      paddingBottom: 10,
      paddingLeft: 8,
      paddingRight: 8,
      marginBottom: 15,
      backgroundColor: '#eff3f9',      
   },
   headerText: {
      fontSize: 30,
   },
}

export default Header;