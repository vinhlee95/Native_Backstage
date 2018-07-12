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
            style={styles.performer}
            imageStyle={styles.image}
            titleContainerStyle={styles.titleContainerStyle}
            titleTextStyle={styles.titleTextStyle}
            fontSize={25}
            arrowSize={25}
         />
         <View style={styles.performanceList}>
            {performanceList}
         </View>
      </View>
   );
}

const styles = {
   performer: {
      flexDirection: 'row',
      paddingTop: 10, paddingBottom: 10,
   },
   titleContainerStyle: {
      borderBottomWidth: 0,
   },
   titleTextStyle: {
      fontSize: 25,
      fontWeight: '600'
   },
   nameContainer: {
      flex: 3,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
   },
   image: {
      height: 60,
      width: 60,
      borderRadius: 30,
   },
   performanceList: {
      borderTopWidth: 0.5, borderBottomWidth: 0.5,
      borderColor: '#e0e2e5'
   }
}

export default PerformerItem;