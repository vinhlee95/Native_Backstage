import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ListItem = (props) => {
   const styles = {
      container: {
         backgroundColor: 'white',
         flexDirection: 'row',
         alignItems: 'center',
      },
      listItem: {
         borderBottomWidth: 0.5,
         borderColor: '#e0e2e5',
         paddingTop: 15,
         paddingBottom: 15,
         flexDirection: 'row',
         justifyContent: 'space-between',
         flex: 1,
      },
      defaultImageStyle: {
         marginLeft: 10,
         marginRight: 10,
      },
      title: {
         fontSize: 18,
      },
      leftIcon: {
         marginLeft: 10, marginRight: 10,
      },
      rightIcon: {
         marginRight: 10,
      }
   }
   return(
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
         <View style={[styles.container, props.style]}>
            {
               props.icon
               ?
               <Ionicons name={props.icon} size={20} style={styles.leftIcon} />
               : null
            }
            {
               props.image
               ?
               <Image source={props.image} style={[props.imageStyle, styles.defaultImageStyle]} />
               :
               null
            }
            <View style={[styles.listItem, props.titleContainerStyle]}>
               <Text style={[styles.title, props.titleTextStyle]}>{props.title}</Text>
               <Ionicons name='ios-arrow-forward' size={props.arrowSize?props.arrowSize:20} style={styles.rightIcon} color={styles.listItem.borderColor} />
            </View>
         </View>
      </TouchableOpacity>
   );
}

export default ListItem;