// consists of performer header & performance list
import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

import PerformanceItem from './PerformanceItem';

const PerformerItem = (props) => {
   const { performerData, productData, handleViewPerformerInfo } = props;
   const {name, profileThumb, description} = performerData;
   let performanceList;
   // render only when productData exists
   !_.isEmpty(productData)
   ?
   performanceList = productData.map((performance,id) => {
      // console.log(performance)
      return <PerformanceItem 
               performance={performance} 
               key={id}
               handleViewPerformanceInfo={() => props.navigation.navigate('PerformanceInfo', {performanceData: performance, id})} />
   })
   :
   performanceList = null;
   return(
      <View style={{ marginBottom: 20 }}> 
         <TouchableHighlight 
            style={{ backgroundColor: 'white' }}
            onPress={() => handleViewPerformerInfo()}
            underlayColor="#d1d3d6" >
            <View style={styles.performer}>
               <View style={styles.imageContainer}>
                  <Image source={{uri:profileThumb}} style={styles.image} />
               </View>
               <View style={styles.nameContainer}>
                  <Text style={styles.name}>{name}</Text>
                  <Ionicons name="ios-arrow-forward" size={25} style={styles.arrowIcon} color="#e1e3e8" />
               </View>
            </View>
         </TouchableHighlight>
         {performanceList}
      </View>
   );
}

const styles = {
   performer: {
      flexDirection: 'row',
      paddingTop: 10, paddingBottom: 10,
   },
   nameContainer: {
      flex: 3,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
   },
   name: {
      fontSize: 25,
   },
   imageContainer: {
      flex: 1,
      marginRight: 10
   },
   image: {
      height: 80,
      width: 80,
      borderRadius: 40,
      marginLeft: 'auto',
      marginRight: 'auto'
   },
   arrowIcon: {
      position: 'absolute',
      right: 5,
      top: '40%'
   }
}

export default PerformerItem;