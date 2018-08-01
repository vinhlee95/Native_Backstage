import React, { Component } from 'react'
import { View, ScrollView, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, Animated } from 'react-native';
import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import alertMessage from '../UI/alertMessage';
import ListItem from '../UI/ListItem';

const DEVICE_HEIGHT = Dimensions.get('window').height;

class PerformanceEdit extends Component {
   // render Header
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Edit performance" />,
         headerLeft: <HeaderLeftTitle navigation={navigation} />,
         headerRight: <HeaderRightTitle 
                        saveInfo={navigation.getParam('saveInfo')} />,
         headerStyle: {
            backgroundColor: '#1a4b93'
         },
         headerTintColor: 'white'
      }
   }
   constructor(props) {
      super(props);
      const { navigation } = this.props;
      const { params } = navigation.state;
      const { audienceSize, duration, audio, carToDoor, price, electricity } = params.tagData;
      const { title, name, description, image, id } = params;
      this.state = {
         title, name, description, image, id,
         tagData: {
            audienceSize, duration, audio, carToDoor, price, electricity,
         }
      }
      this.keyboardHeight = new Animated.Value(0);
      this.inputs = {};
   }

   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
      this.props.navigation.setParams({
         saveInfo: this.handleSaveInfo
      })
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

   handleSaveInfo = () => {
      const { name, title, description, tagData, image, id } = this.state;
      const { navigation } = this.props;

      this.props.updatePerformance(name, title, description, tagData, image, id);
      navigation.state.params.returnData(this.state);
      alertMessage(() => navigation.goBack());
   }

    handleFocusNextField = (fieldID) => {
       this.inputs[fieldID].focus();
    }

   render() {
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Animated.View style={[styles.container, { marginBottom: this.keyboardHeight } ]}>
               <ScrollView>
                  <ListItem
                     icon='ios-person-outline'
                     title='Performer'
                     placeholder='Performer name'
                     textInputValue={this.state.name}
                     onChangeText={name => this.setState({ name })}
                     returnKeyType='next'
                     onSubmitEditing={() => this.handleFocusNextField('performanceName')} 
                     noArrow
                  />

                  <ListItem
                     icon='ios-create-outline'
                     title='Performance'
                     placeholder='Performance name'
                     textInputValue={this.state.title}
                     onChangeText={title => this.setState({ title })}
                     returnKeyType='next'
                     reference={input => this.inputs['performanceName'] = input}
                     onSubmitEditing={() => this.handleFocusNextField('description')} 
                     noArrow
                  /> 

                  <ListItem
                     icon='ios-document-outline'
                     title='Description'
                     placeholder='Description'
                     multiline
                     numberOfLines={2}
                     textAlign='left'
                     style={{
                        alignItems: 'flex-start'
                     }}
                     iconStyle={{
                        paddingTop: 15
                     }}
                     textInputValue={this.state.description}
                     onChangeText={description => this.setState({ description })}
                     returnKeyType='next'
                     reference={input => this.inputs['description'] = input}
                     onSubmitEditing={() => this.handleFocusNextField('audienceSize')} 
                     noArrow
                  /> 

                  <ListItem
                     icon='ios-people-outline'
                     title='Audience'
                     placeholder='Audience'
                     textInputValue={this.state.tagData.audienceSize}
                     onChangeText={size => this.setState({
                        tagData: {
                           ...this.state.tagData,
                           audienceSize: size
                        }
                     })}
                     reference={input => this.inputs['audienceSize'] = input}
                     keyboardType='numeric'
                     noArrow
                  /> 

                  <ListItem
                     icon='ios-clock-outline'
                     title='Duration (minutes)'
                     placeholder='Duration'
                     textInputValue={this.state.tagData.duration}
                     leftContent={2}
                     onChangeText={duration => this.setState({
                        tagData: {
                           ...this.state.tagData,
                           duration
                        }
                     })}
                     keyboardType='numeric'
                     noArrow
                  /> 
                  
                  <ListItem
                     icon='ios-pricetag-outline'
                     title='Price (€)'
                     placeholder='Price'
                     textInputValue={this.state.tagData.price}
                     onChangeText={price => this.setState({
                        tagData: {
                           ...this.state.tagData,
                           price
                        }
                     })}
                     keyboardType='numeric'
                     noArrow
                  /> 

                  <ListItem
                     title='Audio'
                     icon='ios-musical-note-outline'
                     switch
                     switchValue={this.state.tagData.audio}
                     onSwitchValueChange={() => 
                        this.setState({
                           tagData: {
                              ...this.state.tagData,
                              audio: !this.state.tagData.audio
                           }
                        })
                     } 
                     noArrow
                     unTouchable
                  />

                  <ListItem
                     title='Car to door'
                     icon='ios-car-outline'
                     switch
                     switchValue={this.state.tagData.carToDoor}
                     onSwitchValueChange={() => 
                        this.setState({
                           tagData: {
                              ...this.state.tagData,
                              carToDoor: !this.state.tagData.carToDoor
                           }
                        })
                     } 
                     noArrow
                     unTouchable
                  />

                  <ListItem
                     title='Electricity'
                     icon='ios-flash-outline'
                     switch
                     switchValue={this.state.tagData.electricity}
                     onSwitchValueChange={() => 
                        this.setState({
                           tagData: {
                              ...this.state.tagData,
                              electricity: !this.state.tagData.electricity
                           }
                        })
                     } 
                     noArrow
                     unTouchable
                  />

               </ScrollView>
            </Animated.View>
         </TouchableWithoutFeedback>
      )
   }
}

const styles = {
   boolRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor:'white',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e2e5'
   }
}


export default connect(null, actions)(PerformanceEdit);
