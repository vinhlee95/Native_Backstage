// consists of performer header & performance list
import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ListItem from '../UI/ListItem';
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
         <ListItem
            image={{uri: profileThumb}}
            title={name}
            onPress={() => handleViewPerformerInfo()}
            imageStyle={styles.image}
            style={styles.performer}
            fontSize={25}
            arrowSize={25}
         />
         {performanceList}
      </View>
   );
}

const styles = {
   performer: {
      flexDirection: 'row',
      paddingTop: 10, paddingBottom: 10,
      borderBottomWidth: 0,
   },
   nameContainer: {
      flex: 3,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
   },
   image: {
      height: 80,
      width: 80,
      borderRadius: 40,
      marginLeft: 10,
      marginRight: 10,
   },
}

export default PerformerItem;