import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Spinner from './Spinner';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ModalLogout = (props) => {
   return(
      <View style={styles.backdrop}>
         <View style={styles.banner}>
            <Text style={styles.text}>Logging out</Text>
            <Spinner color="#c7c7d6" size='small' />
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
      top: DEVICE_HEIGHT/3,
      width: '60%',
      left: '20%',
      right: '20%',
      backgroundColor: '#333335',
      borderRadius: 5,
      paddingTop: 20, paddingBottom: 20,
      display: 'flex',
   },
   text: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#c7c7d6',
      marginBottom: 10,
   }
}

export default ModalLogout;