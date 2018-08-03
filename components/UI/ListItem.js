import React from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = (props) => {
   // right content only acquires a bigger width when text input exists
   let rightContentFlex = props.textInputValue || props.textInputValue === '' ? 2 : 0.5;
   const styles = {
      container: {
         backgroundColor: 'white',
         flexDirection: 'row',
         alignItems: props.leftTextContent ? 'flex-start' : 'center',
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
         flexDirection:  'row',
         justifyContent: 'space-between', alignItems: 'center',
         flex: 10,
      },
      leftContent: {
         flex: props.leftContent ? props.leftContent : 1,
      },
      rightContent: {
         flex: rightContentFlex,
         flexDirection: 'row',
         justifyContent: 'flex-end',
         alignItems: 'center',
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
         paddingTop: props.leftTextContent ? 15 : 0,
      },
   }
   return(
      <TouchableOpacity onPress={props.onPress} activeOpacity={props.unTouchable?1:0.7}>
         <View style={[styles.container, props.style]}>

            {/* icons */}
            {
               props.icon
               ?
               <View style={styles.leftIconContainer}>
                  <Ionicons name={props.icon} size={props.leftIconSize?props.leftIconSize:22} style={[styles.leftIcon, props.iconStyle]} color={props.iconColor} />
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

            {/* list item */}
            <View style={[styles.listItem, props.titleContainerStyle]}>
               <View style={styles.leftContent}>
                  <Text style={[styles.title, props.titleTextStyle]}>{props.title}</Text>

                  {
                     props.leftTextContent
                     ?
                     <View style={{ marginTop: 10 }}>
                        {props.leftTextContent}
                     </View>
                     : null
                  }
               </View>
               
               <View style={[styles.rightContent, props.rightContentStyle]}>
                  {
                     props.textInputValue || props.textInputValue === ''
                     ?
                     <TextInput 
                        placeholder={props.placeholder}
                        value={props.textInputValue}
                        style={{width: '100%',fontSize: 16, textAlign: props.textAlign ? props.textAlign : 'right'}}
                        onChangeText={props.onChangeText}
                        returnKeyType={props.returnKeyType}
                        onSubmitEditing={props.onSubmitEditing}
                        ref={props.reference}
                        keyboardType={props.keyboardType}
                        clearButtonMode="while-editing"
                        multiline={props.multiline}
                        numberOfLines={props.numberOfLines}
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
                     props.mapView
                     ?
                     <View>{props.mapView}</View>
                     : null
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