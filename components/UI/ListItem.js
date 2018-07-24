import React from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = (props) => {
   // right content only acquires a bigger width when text input exists
   let rightContentFlex = props.textInputValue ? 2 : 0.5;
   const styles = {
      container: {
         backgroundColor: 'white',
         flexDirection: 'row',
         alignItems: 'center',
         paddingLeft: 10,
      },
      leftIconContainer: {
         // set a fixed flex for icon
         // so it only acquires 1:10 compared with the listItem container
         flex: props.leftIconFlex ? props.leftIconFlex : 1,
         flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
      },
      listItem: {
         borderBottomWidth: 1,
         borderTopWidth: props.borderTopWidth?props.borderTopWidth:0,
         borderColor: '#e0e2e5',
         paddingTop: 15,
         paddingBottom: 15,
         flexDirection: 'row',
         justifyContent: 'space-between',
         flex: 10,
      },
      leftContent: {
         flex: props.leftContent ? props.leftContent : 1,
         justifyContent: 'center'
      },
      rightContent: {
         flex: rightContentFlex,
         flexDirection: 'row',
         justifyContent: 'flex-end',
         marginRight: 10,
      },
      defaultImageStyle: {
         marginRight: 10,
      },
      title: {
         fontSize: 18,
         fontWeight: '500'
      },
      rightTitle: {
         fontSize: 16,
      },
      leftIcon: {
         marginRight: 10,
      },
   }
   return(
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
         <View style={[styles.container, props.style]}>
            {
               props.icon
               ?
               <View style={styles.leftIconContainer}>
                  <Ionicons name={props.icon} size={props.leftIconSize?props.leftIconSize:22} style={styles.leftIcon} color={props.iconColor} />
               </View>
               : null
            }
            {
               props.fontAwesomeIcon
               ?
               <View style={styles.leftIconContainer}>
                  <Icon name={props.fontAwesomeIcon} size={22} style={styles.leftIcon} color={props.iconColor} />
               </View>
               : 
               null
            }
            {
               props.image
               ?
               <Image source={props.image} style={[props.imageStyle, styles.defaultImageStyle]} />
               :
               null
            }
            <View style={[styles.listItem, props.titleContainerStyle]}>
               <View style={styles.leftContent}>
                  <Text style={[styles.title, props.titleTextStyle]}>{props.title}</Text>
               </View>
               <View style={styles.rightContent}>
                  {
                     props.textInputValue
                     ?
                     <TextInput 
                        placeholder={props.placeholder}
                        value={props.textInputValue}
                        style={{width: '100%',fontSize: 16, textAlign: 'right'}}
                        onChangeText={props.onChangeText}
                        returnKeyType={props.returnKeyType}
                        onSubmitEditing={props.onSubmitEditing}
                        ref={props.reference}
                        keyboardType={props.keyboardType}
                     />
                     :
                     null
                  }
                  {
                     props.rightTitle
                     ?
                     <Text style={styles.rightTitle}>{props.rightTitle}</Text>
                     :
                     null
                  }
                  {
                     props.noArrow
                     ?
                     null
                     :
                     <Ionicons 
                        name='ios-arrow-forward' 
                        style={{marginLeft: 5}}
                        size={props.arrowSize?props.arrowSize:20} 
                        color={styles.listItem.borderColor} />
                  }
                  {
                     props.switch
                     ?
                     <Switch
                        value={props.switchValue}
                        onValueChange={props.onSwitchValueChange}
                     />
                     :
                     null
                  }
               </View>
            </View>
         </View>
      </TouchableOpacity>
   );
}

export default ListItem;