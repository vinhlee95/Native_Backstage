// TODO: Passing these props when reusing this component:
// 1. title 2. spinnerColor   3. spinnerSize 4. bannerBackgroundColor   5. textColor

import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Spinner from './Spinner';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Modal = (props) => {
   let width = props.width ? props.width : '60%';
   let centerMargin = props.centerMargin ? props.centerMargin : '20%';
   let textColor = props.textColor ? props.textColor : '#1a4b93';
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
         width: width,
         left: centerMargin,
         right: centerMargin,
         backgroundColor: props.bannerBackgroundColor,
         borderRadius: 5,
         paddingTop: 20,
         paddingBottom: 20,
         display: 'flex',
         zIndex: 1001,
      },
      title: {
         textAlign: 'center',
         fontSize: 20,
         fontWeight: 'bold',
         color: textColor,
         marginBottom: 10,
      }
   }

   return(
      <View style={styles.backdrop}>
         <View style={styles.banner}>
            <Text style={[styles.title, {marginBottom: 5}]}>{props.title}</Text>
            <Text style={[styles.title, {marginBottom: 15}]}>{props.subtitle}</Text>
            <Spinner color={props.spinnerColor} size={props.spinnerSize} />
         </View>
      </View>
   )
}


export default Modal;