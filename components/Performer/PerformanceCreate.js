import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../UI/Header';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';
import Spinner from '../UI/Spinner';
import Input from '../UI/Input';
import ListItem from '../UI/ListItem';
import Tag from '../UI/Tag';

const DEVICE_WIDTH = Dimensions.get('window').width;

class PerformanceCreate extends Component {
   state = {
      image: null,
      name: '',
      description: '',
      isLoading: false,
      tagData: null,
   };

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
      const { audienceSize, audio, performanceDuration, carToDoor, electricity, price } = this.state.tagData;

      let audioTag, carToDoorTag, electricityTag;
      audio?audioTag="Audio":"";
      carToDoor?carToDoorTag="Car to door":"";
      electricity?electricityTag="Electricity":"";

      const data = [
         {
            tagName: `${audienceSize}`,
            tagIonIconName: 'ios-people',
         },
         {
            tagName: `${performanceDuration}`,
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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
         <Header
            headerName="New performance"
            notShowIcon headerRightTitle = "Done"
            navigateBack={() => this.props.navigation.goBack()} />
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
                                 <Text>Add photo</Text>
                              </View>
                           }
                        </View>
                     </TouchableWithoutFeedback>
                  }

                  <Text style={styles.label}>Performance name</Text>
                  <Input
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })} />

                     <Text style={styles.label}>Performance description</Text>
                     <Input
                        value={this.state.description}
                        onChangeText={description => this.setState({ description })}
                        // multiline
                        numberOfLines={2} />
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
                        title={this.state.tagData?'Edit tags':'Add tags'} 
                        onPress={() => 
                           this.props.navigation.navigate('NewTag', 
                           {
                              returnData: this.returnData,
                              tagData: this.state.tagData
                           },
                        )}/>

                     <Button title="Save" onPress={() => this.props.navigation.goBack()}/>  
                     
                  </ViewContainer>
               </ScrollView>
         </View>
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
      fontSize: 16,
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

export default PerformanceCreate;
