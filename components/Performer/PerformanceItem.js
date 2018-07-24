import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ListItem from '../UI/ListItem';

const PerformanceItem = (props) => {
   const { title, productImage } = props.performance;
   let imageURI;
   if(!props.performance.image) {
      imageURI = productImage;
   } else {
      imageURI = props.performance.image;
   }
   return(
      <ListItem
         image={{uri: imageURI}}
         imageStyle={styles.productImage}
         title={title}
         onPress={() => props.handleViewPerformanceInfo()}
         style={styles.listItemContainer}
         titleContainerStyle={styles.titleContainerStyle}
         titleTextStyle={{fontWeight: '400'}}
      />
   );
}

const styles = {
   listItemContainer: {
   },
   titleContainerStyle: {
      paddingTop: 25,
      paddingBottom: 25,
   },
   productImage: {
      height: 50,
      width: 50,
      borderRadius: 3,
   },
}

export default PerformanceItem;