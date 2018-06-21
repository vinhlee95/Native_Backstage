import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';


const Tags = (props) => {
   let tagWidth = props.tagWidth?props.tagWidth:60;
   let tagBackgroundColor = props.backgroundColor?props.backgroundColor:'#2d81e2';
   let tagNameColor = props.textColor?props.textColor:'white';
   let tagIconColor = props.iconColor?props.iconColor:'white';
   const styles = {
      tagContainer: {
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         width: tagWidth,
         backgroundColor: tagBackgroundColor,
         borderRadius: 15,
         paddingTop: 3,
         paddingBottom: 3,
         paddingLeft: 15,
         paddingRight: 15,
         marginRight: 10,
         marginBottom: 5,
         shadowColor: '#000',
         shadowOffset: {width: 0, height: 1},
         shadowOpacity: 0.1,
         shadowRadius: 2,
      },
      tagName: {
         color: tagNameColor,
      },
      icon: {
         marginRight: 5,
      }
   }
   if(props.hideTag) {
      return null;
   }
   return(
      <View style={[styles.tagContainer, props.style]}>
         {/* workaround: using either FontAwesome icons or default expo */}
         {
            props.tagIonIconName
            ?
            <Ionicons name={props.tagIonIconName} size={props.tagIconSize?props.tagIconSize:20} style={styles.icon} color={tagIconColor}/>
            : null
         }
         {
            props.tagIconName
            ?
            <Icon name={props.tagIconName} size={20} style={styles.icon} color={tagIconColor} />
            : null
         }
         <Text style={styles.tagName}>{props.tagName}</Text>
      </View>
   );
};



export default Tags;