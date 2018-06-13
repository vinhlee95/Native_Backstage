// TODO: Passing these props when reusing this component:
// 1. title 2. spinnerColor   3. spinnerSize 4. bannerBackgroundColor   5. textColor

import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Spinner from './Spinner';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Modal = (props) => {
   const styles = {
      backdrop: {
         flex: 1,
         position: 'absolute',
         top: 0,
         left: 0,
         width: DEVICE_WIDTH,
         height: DEVICE_HEIGHT,
         backgroundColor: 'rgba(0,0,0, .3)',
         zIndex: 1001,
      },
      banner: {
         position: 'absolute',
         top: DEVICE_HEIGHT / 3,
         width: '60%',
         left: '20%',
         right: '20%',
         backgroundColor: props.bannerBackgroundColor,
         borderRadius: 5,
         paddingTop: 20,
         paddingBottom: 20,
         display: 'flex',
         zIndex: 1001,
      },
      text: {
         textAlign: 'center',
         fontSize: 20,
         fontWeight: 'bold',
         color: props.textColor,
         marginBottom: 10,
      }
   }

   return(
      <View style={styles.backdrop}>
         <View style={styles.banner}>
            <Text style={styles.text}>{props.title}</Text>
            <Spinner color={props.spinnerColor} size={props.spinnerSize} />
         </View>
      </View>
   )
}


export default Modal;