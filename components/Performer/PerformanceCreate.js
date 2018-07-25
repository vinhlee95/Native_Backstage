import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Dimensions, Keyboard, Animated, Picker } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import ViewContainer from '../UI/View';
import Spinner from '../UI/Spinner';
import Tag from '../UI/Tag';
import Label from '../UI/Label';
import ListItem from '../UI/ListItem';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';
import alertMessage from '../UI/alertMessage';

import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const DEVICE_WIDTH = Dimensions.get('window').width;

class PerformanceCreate extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="New performance" />,
         headerLeft: <HeaderLeftTitle navigation={navigation} />,
         headerRight: <HeaderRightTitle 
                        saveInfo={navigation.getParam('saveData')} />,
         headerStyle: {
            backgroundColor: '#1a4b93'
         },
      }
   }
   constructor(props) {
      super(props);
      this.state = {
         image: null,
         name: '',
         title: '',
         description: '',
         isLoading: false,
         tagData: {
            audienceSize: '', 
            duration: '', 
            price: '', 
            audio: null, 
            carToDoor: null, 
            electricity: null,
         },
      };
      this.keyboardHeight = new Animated.Value(0);
      this.inputs = {};
   }

   // add event listener for keyboard to show up
   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
      // allowing header right button 
      // to get access to function inside class
      this.props.navigation.setParams({
         saveData: this.handleSaveData
      });
   }

   componentWillUnmount() {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
   }

   // callbacks
   keyboardWillShow = (event) => {
      // this.setState({ flexNumber: 0.7})
      Animated.timing(this.keyboardHeight, {
         duration: event.duration,
         toValue: event.endCoordinates.height,
      }).start();
   };

   keyboardWillHide = (event) => {
      // this.setState({ flexNumber: 0.4})      
      Animated.timing(this.keyboardHeight, {
         duration: event.duration,
         toValue: 10,
      }).start();
   };


   handleSaveData = () => {
      const { name, title, description, tagData, image } = this.state;
      // do sth to save data
      alertMessage(() => this.props.navigation.goBack());
      this.props.addPerformance(name, title, description, tagData, image);
   }
   

   pickImage = async () => {
      this.setState({
         isLoading: true
      })
      const permissions = Permissions.CAMERA_ROLL;
      const {
         status
      } = await Permissions.askAsync(permissions);

      if (status === 'granted') {
         let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
         });
         if (!result.cancelled) {
            this.setState({
               image: result.uri,
               isLoading: false
            });
         }
      }
   }

   returnData = (tagData) => {
      this.setState({
         ...this.state,
         tagData
      })
   }

   renderTagList = () => {
      const { audienceSize, audio, duration, carToDoor, electricity, price } = this.state.tagData;

      let audioTag, carToDoorTag, electricityTag;
      // change from bool value to equivalent text
      audio?audioTag="Audio":"";
      carToDoor?carToDoorTag="Car to door":"";
      electricity?electricityTag="Electricity":"";

      const data = [
         {
            tagName: `${audienceSize}`,
            tagIonIconName: 'ios-people',
         },
         {
            tagName: `${duration}`,
            tagIonIconName: 'ios-clock',
            tagWidth: 100,
         },
         {
            tagName: `${price}`,
            tagIonIconName: 'ios-pricetag',
            tagWidth: 80,
         },
         {
            tagName: audioTag,
            tagIonIconName: 'ios-musical-note',
            tagWidth: 80,
         },
         {
            tagName: carToDoorTag,
            tagIonIconName: 'ios-car',
            tagWidth: 120,
         },
         {
            tagName: electricityTag,
            tagIconName: 'bolt',
            tagWidth: 100,
         },
      ];
      return data.map((tagItem, index) => {
         let hideTag = tagItem.tagName ? false : true;
         const { tagName, tagIonIconName, tagIconName, tagWidth } = tagItem;
         if(tagIonIconName === 'ios-clock') {
            tagItem.tagName += ' mins';
         } else if(tagIonIconName === 'ios-pricetag') {
            tagItem.tagName += ' €';
         }
         return (
            <Tag 
               key={index}
               tagName={tagItem.tagName} 
               tagIonIconName={tagIonIconName}
               tagIconName={tagIconName}
               tagWidth={tagWidth}
               hideTag={hideTag} />
         );
      });
   }

   handleFocusNextField = (fieldID) => {
      this.inputs[fieldID].focus();
   }

  render() {
     console.log(`${this.state.name} is chosen as artist name`)
     // render picker items
     const {performerNameList} = this.props.navigation.state.params;
     let pickerItems;
     pickerItems = performerNameList.map((item, id) => {
        return(
           <Picker.Item label={item} value={item} key={id} />
        )
     });

     // return true if at least 1 tag shows up
     let noTag = _.toArray(this.state.tagData).every(item => item === null || item === '');
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1}}>
         <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
            <ScrollView>
                  {/* Profile upload */}
                  {
                     this.state.image
                     ?
                     <Image 
                        source={{ uri: this.state.image }}
                        style={styles.image} />
                     :
                     <TouchableWithoutFeedback onPress={() => this.pickImage()} >
                        <View style={styles.image}>
                           {
                              this.state.isLoading
                              ?
                              <Spinner animating />
                              :
                              <View style={styles.iconContainer}>
                                 <Ionicons name="ios-camera" size={60} />
                                 <Text>Add media</Text>
                              </View>
                           }
                        </View>
                     </TouchableWithoutFeedback>
                  }
                  <View style={{marginBottom: 20 }}>
                     <Label title='Performer name' icon='ios-person-outline' iconColor='#3ec1d8' />
                     <Picker
                        selectedValue={this.state.name}
                        style={{ height: 100 }}
                        itemStyle={{ fontSize: 18, height: 100, fontWeight: '600'}}
                        onValueChange={(itemValue) => this.setState({name: itemValue})}
                        >
                        <Picker.Item label='Please choose an artist' />
                        {pickerItems}
                     </Picker>
                  </View>

                  <ListItem
                     title='Performance'
                     placeholder='Performance'
                     icon='ios-film-outline'
                     textInputValue={this.state.title}
                     onChangeText={title => this.setState({ title })}
                     onSubmitEditing={() => this.handleFocusNextField('description')} 
                     returnKeyType='next'
                     noArrow
                  />

                  <ListItem
                     title='Description'
                     placeholder='Description'
                     icon='ios-information-circle-outline'
                     textInputValue={this.state.description}
                     onChangeText={description => this.setState({ description })}
                     reference={input => this.inputs['description'] = input}  
                     returnKeyType='done'
                     noArrow
                  />

                  {/* Tag list */}
                  {
                     noTag
                     ?
                     null
                     :
                     <View style={styles.tagContainer}>
                        <Label title='Tags' icon='ios-pricetags-outline' iconColor='blue' />
                        <View style={styles.tagList}>
                           {this.renderTagList()}
                        </View>
                     </View>
                  }
                  <ListItem 
                     title={noTag?'Add tags':'Edit tags'} 
                     icon={noTag?'ios-add-circle-outline':'ios-build-outline'}
                     iconColor='blue'
                     style={{marginBottom: 20}}
                     onPress={() => 
                        this.props.navigation.navigate('NewTag', 
                        {
                           returnData: this.returnData,
                           tagData: this.state.tagData
                        },
                     )}/>
                     
               </ScrollView>
            </Animated.View>
         </View>
         </TouchableWithoutFeedback>
      )
   }
}

const styles = {
   image: {
      backgroundColor: 'lightgrey',
      width: 200,
      height: 200,
      borderRadius: 100,
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   tagContainer: {
      marginTop: 10
   },
   tagList: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: DEVICE_WIDTH,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: 'white', paddingTop: 10, paddingBottom: 10,
   },
}

export default connect(null, actions)(PerformanceCreate);
