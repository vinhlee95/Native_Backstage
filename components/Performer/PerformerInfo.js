import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Keyboard, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';
import Label from '../UI/Label';

import ListItem from '../UI/ListItem';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class PerformerInfo extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle={navigation.state.params.performerData.name} />,
         // headerLeft: <HeaderLeftTitle navigation={navigation} />,
         headerStyle: {
            backgroundColor: '#1a4b93'
         },
         headerTintColor: 'white'
      }
   }

   constructor(props) {
      super(props);
      const {params} = this.props.navigation.state;
      // get performer data & product data
      const { name, description, profile_facebook, profile_instagram, profilePic, id } = params.performerData; 
      this.productData = params.productData;

      // set state accordingly
      this.state = { 
         name, description, profile_facebook, profile_instagram, profilePic, id 
      };
      this.inputs = {};
   }

   handleEditInfo = () => {
      const { name, description, profile_facebook, profile_instagram, profilePic, id } = this.state;
      const productData = this.productData;
      this.props.navigation.navigate('PerformerEdit', {
         name, description, profile_facebook, profile_instagram, profilePic, id, productData,
         returnData: this.returnData
      });
   }

   returnData = (data) => {
      const { name, description, profile_facebook, profile_instagram } = data;
      this.setState({ name, description, profile_facebook, profile_instagram });
   }

   handleFocusNextField = (fieldID) => {
      this.inputs[fieldID].focus();
   }

   render() {
      const { profilePic, description, profile_facebook,profile_instagram } = this.state;
      return (
         <ScrollView>         
            <View style={styles.imageContainer}>
               <Image source={{uri:profilePic}} style={styles.image} />
               <Text style={styles.performerName}>{this.state.name}</Text>
            </View>
            <View>

               {
                  description
                  ?
                  <ListItem
                     title='About'
                     icon='ios-person-outline' 
                     iconColor='#3ec1d8'
                     leftTextContent={
                        <Text style={{ fontSize: 16 }}>{this.state.description}</Text> 
                     }
                     noArrow
                     unTouchable
                  />
                  : null
               }
               
               <ListItem 
                  fontAwesomeIcon='facebook-square'
                  title="Facebook" 
                  rightTitle={this.state.profile_facebook}
                  iconColor='#1d71d3'
                  noArrow
                  unTouchable
                  rightContentStyle={{ flex: 2 }}
               />

               <ListItem 
                  fontAwesomeIcon='instagram'
                  title="Instagram" 
                  rightTitle={this.state.profile_instagram}
                  iconColor='#d85936'
                  noArrow
                  unTouchable
                  rightContentStyle={{ flex: 2 }}
               />

               { /* buttons */ }
               <View style={{ 
                  borderBottomWidth: 0.5, 
                  borderColor:'#e0e2e5',
               }}>
                  <ListItem 
                     icon='ios-create-outline'
                     title="Edit performer" 
                     iconColor='#378cef'
                     onPress={this.handleEditInfo} 
                  />
                  <ListItem
                     icon='ios-trash-outline'
                     titleContainerStyle={{borderBottomWidth:0}}
                     iconColor='red'
                     title='Delete performer'
                     onPress={this.handleDeletePerformance}
                  />
               </View>
            </View>
         </ScrollView>
      )
   }
}

const styles = {
   imageContainer: {
      flex: 1,
   },
   image: {
      width: '100%',
      height: DEVICE_HEIGHT/2.5,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
   },
   performerName: {
      position: 'absolute',
      bottom: 20, left: 10,
      color: 'white', fontWeight: 'bold', fontSize: 40,
   }
}

export default PerformerInfo;
