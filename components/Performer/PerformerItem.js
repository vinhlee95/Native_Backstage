// consists of performer header & performance list
import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ListItem from '../UI/ListItem';
import _ from 'lodash';
import ProfileThumb from '../../images/profile.jpeg';

import PerformanceItem from './PerformanceItem';

const PerformerItem = (props) => {
   const { performerData, productData, handleViewPerformerInfo } = props;
   const {name, profileThumb, profilePic} = performerData;
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

   let imageURI;
   if(!profileThumb && !profilePic) {
     imageURI= 'https://goo.gl/images/QmEExp'
   } else if(profileThumb) {
     imageURI = profileThumb;
   } else {
     imageURI = profilePic;
   }

   return(
      <View style={{ 
         marginBottom: 20,
         borderTopWidth: 1, borderBottomWidth: 1,
         borderColor: '#e0e2e5',
      }}> 
         <ListItem
            image={{uri: imageURI }}
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
            <ListItem
               title='Add new performance...'
               icon='ios-film-outline'
               leftIconSize={65}
               leftIconFlex={2}
               style={styles.addIcon}
               iconColor='#b4bac4'
               titleContainerStyle={{
                  paddingTop: 25,
                  paddingBottom: 25,
               }}
               titleTextStyle={{color: '#b4bac4'}}
               onPress={() => props.navigation.navigate('PerformanceCreate', {
                  performerNameList: props.performerNameList
               })}
            />
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
   },
}

export default PerformerItem;