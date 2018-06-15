import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../UI/Button';

const PerformanceItem = (props) => {
   const { title, productImage } = props.performance;
   return(
      <TouchableHighlight 
         onPress={() => console.log('item pressed')}
         underlayColor="#d1d3d6" >
         <View style={styles.container}>
            <View style={styles.imageContainer}>
               <Image source={{uri: productImage}} style={styles.productImage} />
            </View>
            <View style={styles.infoContainer}>
               <Text>{title}</Text>
               <Icon name="chevron-right" size={20} style={styles.arrowIcon} color="#e1e3e8" />
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
      paddingTop: 5, paddingBottom: 5,
      backgroundColor: '#eff0f2'
   },
   imageContainer: {
      flex: 1,
   },
   productImage: {
      height: 80,
      width: 80,
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 'auto'
   },
   infoContainer: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'center'
   },
   arrowIcon: {
      position: 'absolute',
      right: 5,
      top: '40%'
   }
}

export default PerformanceItem;