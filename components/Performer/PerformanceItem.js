import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerformanceItem = (props) => {
   const { title, productImage } = props.performance;
   let imageURI;
   if(!props.performance.image) {
      imageURI = productImage;
   } else {
      imageURI = props.performance.image;
   }
   return(
      <TouchableHighlight 
         style={{ backgroundColor: 'white' }}
         onPress={() => props.handleViewPerformanceInfo()}
         underlayColor="#d1d3d6" >
         <View style={styles.container}>
            <View style={styles.imageContainer}>
               <Image source={{uri: imageURI }} style={styles.productImage} />
            </View>
            <View style={styles.infoContainer}>
               <View style={{ width: '50%'}}>
                  <Text style={{fontSize: 16}}>{title}</Text>
               </View>
               <Ionicons name="ios-arrow-forward" size={25} style={styles.arrowIcon} color="#e1e3e8" />
            </View>
         </View>
      </TouchableHighlight>
   );
}

const styles = {
   container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderTopWidth: .5,
      borderBottomWidth: .5,
      borderColor: '#e1e3e8',
      paddingTop: 10, paddingBottom: 10,
      // backgroundColor: '#eff0f2'
   },
   imageContainer: {
      flex: 1,
   },
   productImage: {
      height: 50,
      width: 50,
      borderRadius: 3,
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   infoContainer: {
      flex: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   arrowIcon: {
      marginRight: 5,
   }
}

export default PerformanceItem;