import React, { Component } from 'react'
import { View, Text, ScrollView, Switch, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '../UI/Input';
import ListItem from '../UI/ListItem';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

class TagEdit extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Add tags" />,
         headerLeft: <HeaderLeftTitle navigation={navigation} />,
         headerRight: <HeaderRightTitle
                        saveInfo={navigation.getParam('saveTag')} />,
         headerStyle: {
            backgroundColor: '#1a4b93'
         },
         headerTintColor: 'white'
      }
   }
   constructor(props) {
      super(props);
      if(this.props.navigation.state.params.tagData) {
         this.state = this.props.navigation.state.params.tagData
      } else {
         this.state = {
            audienceSize: '', 
            duration: '', 
            price: '', 
            audio: false, 
            carToDoor: false, 
            electricity: false,
         }
      }
   }

   componentWillMount() {
      this.props.navigation.setParams({
         saveTag: this.goBack
      })
   }

   goBack = () => {
      const { navigation } = this.props;
      navigation.state.params.returnData(this.state);
      navigation.goBack();
   }

   render() {
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
         <View style={{flex:1, backgroundColor: 'white'}}>
               <ScrollView>

                  <ListItem
                     title='Audience size'
                     placeholder='Audience size'
                     icon="ios-people-outline"
                     textInputValue={this.state.audienceSize}
                     onChangeText={audienceSize => this.setState({ audienceSize })}
                     returnKeyType='next'
                     keyboardType='numeric'
                     noArrow
                  />

                  <ListItem
                     title='Audience size'
                     placeholder='Duration (minutes)'
                     icon="ios-clock-outline"
                     textInputValue={this.state.duration}
                     onChangeText={duration => this.setState({ duration })}
                     keyboardType='numeric'
                     noArrow
                  />

                  <ListItem
                     title='Price (€)'
                     placeholder='Price'
                     icon="ios-pricetag-outline"
                     textInputValue={this.state.price}
                     onChangeText={price => this.setState({ price })}
                     keyboardType='numeric'
                     returnKeyType='done'
                     noArrow
                  />

                  <ListItem
                     title='Audio'
                     icon='ios-musical-note-outline'
                     switch
                     switchValue={this.state.audio}
                     onSwitchValueChange={() => this.setState({ audio: !this.state.audio})}
                     noArrow
                  />

                  <ListItem
                     title='Car to door'
                     icon='ios-car-outline'
                     switch
                     switchValue={this.state.carToDoor}
                     onSwitchValueChange={() => this.setState({ carToDoor: !this.state.carToDoor})}
                     noArrow
                  />

                  <ListItem
                     title='Electricity'
                     icon='ios-flash-outline'
                     switch
                     switchValue={this.state.electricity}
                     onSwitchValueChange={() => this.setState({ electricity: !this.state.electricity})}
                     noArrow
                  />

               </ScrollView>
         </View>
         </TouchableWithoutFeedback>
      )
   }
}

export default TagEdit;
