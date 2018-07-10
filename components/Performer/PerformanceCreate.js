import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Dimensions, Keyboard, Animated, Picker } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import Button from '../UI/Button';
import ViewContainer from '../UI/View';
import Spinner from '../UI/Spinner';
import Input from '../UI/Input';
import ListItem from '../UI/ListItem';
import Tag from '../UI/Tag';

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
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: 'white'}}>
         <Animated.View style={{ flex: 1, marginBottom: this.keyboardHeight }}>   
            <ScrollView>
               <ViewContainer>
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
                     <Text style={styles.label}>Performer name</Text>
                     <Picker
                        selectedValue={this.state.name}
                        style={{ height: 100 }}
                        itemStyle={{ fontSize: 16, height: 100, fontWeight: 'bold'}}
                        onValueChange={(itemValue) => this.setState({name: itemValue})}
                        >
                        <Picker.Item label='Please choose an artist' />
                        {pickerItems}
                     </Picker>
                  </View>

                  <Text style={styles.label}>Performance name</Text>
                  <Input
                        value={this.state.title}
                        onChangeText={title => this.setState({ title })} 
                        returnKeyType="next"
                        reference={input => this.inputs['performanceName'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('description')}   
                        />

                  <Text style={styles.label}>Performance description</Text>
                  <Input
                     value={this.state.description}
                     onChangeText={description => this.setState({ description })}
                     // multiline
                     // numberOfLines={2}
                     returnKeyType="done"
                     reference={input => this.inputs['description'] = input}  
                     />

                  <Text style={[styles.label, {marginBottom: 15 }]}>Tags</Text>
                  {/* Tag list */}
                  {
                     this.state.tagData
                     ?
                     <View style={styles.tagList}>
                        {this.renderTagList()}
                     </View>
                     : null
                  }
                  <ListItem 
                     title={_.toArray(this.state.tagData).every(item => item === null || item==='')?'Add tags':'Edit tags'} 
                     onPress={() => 
                        this.props.navigation.navigate('NewTag', 
                        {
                           returnData: this.returnData,
                           tagData: this.state.tagData
                        },
                     )}/>
                     
                  </ViewContainer>
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
   label: {
      fontSize: 18,
      fontWeight: 'bold'
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
   },
}

export default connect(null, actions)(PerformanceCreate);
