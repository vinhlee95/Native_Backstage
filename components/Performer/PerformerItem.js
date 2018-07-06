// consists of performer header & performance list
import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import PerformanceItem from './PerformanceItem';

const PerformerItem = (props) => {
   const { performerData, productData, handleViewPerformerInfo } = props;
   const {name, profileThumb} = performerData;
   let performanceList;
   performanceList = productData.map((performance,id) => {
      return <PerformanceItem 
               performance={performance} 
               key={id}
               handleViewPerformanceInfo={() => props.navigation.navigate('PerformanceInfo', {performanceData: performance})} />
   });
   return(
      <View>
         <TouchableHighlight 
            onPress={() => handleViewPerformerInfo()}
            underlayColor="#d1d3d6" >
            <View style={styles.performer}>
               <View style={styles.imageContainer}>
                  <Image source={{uri:profileThumb}} style={styles.image} />
               </View>
               <View style={styles.nameContainer}>
                  <Text style={styles.name}>{name}</Text>
                  <Icon name="chevron-right" size={20} style={styles.arrowIcon} color="#e1e3e8" />
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
      flex: 2,
      marginLeft: 15,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
   },
   name: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   imageContainer: {
      flex: 1,
   },
   image: {
      height: 100,
      width: 100,
      borderRadius: 50,
      marginLeft: 'auto',
      marginRight: 'auto'
   }
}

export default PerformerItem;