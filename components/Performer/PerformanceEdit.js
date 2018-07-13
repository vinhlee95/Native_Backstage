import React, { Component } from 'react'
import { View, Text, ScrollView, Switch, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '../UI/Input';
import Button from '../UI/Button';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import alertMessage from '../UI/alertMessage';
import Label from '../UI/Label';

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
      const { title, name, description } = params;
      this.state = {
         title, name, description, 
         tagData: {
            audienceSize, duration, audio, carToDoor, price, electricity,
         }
      }
      this.inputs = {};
   }

   componentWillMount() {
      this.props.navigation.setParams({
         saveInfo: this.handleSaveInfo
      })
   }

   handleSaveInfo = () => {
      const { navigation } = this.props;
      navigation.state.params.returnData(this.state);
      alertMessage(() => navigation.goBack());
   }

    handleFocusNextField = (fieldID) => {
       this.inputs[fieldID].focus();
    }

   render() {
      console.log(this.state)
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{backgroundColor: 'white', paddingLeft: '2.5%', paddingRight: '2.5%' }}>
               <ScrollView>
                  <Label title='Performer name' icon='ios-person-outline' style={{marginTop: 20}} />
                  <Input
                     value={this.state.name}
                     onChangeText={name => this.setState({ name })}
                     style={{marginBottom: 25}} 
                     returnKeyType='next'
                     onSubmitEditing={() => this.handleFocusNextField('performanceName')} />
                     />

                  <Label title='Performance name' icon='ios-create-outline' />
                  <Input
                     value={this.state.title}
                     onChangeText={title => this.setState({ title })}
                     style={{marginBottom: 25}} 
                     returnKeyType='next'
                     reference={input => this.inputs['performanceName'] = input}
                     onSubmitEditing={() => this.handleFocusNextField('description')} />
                     />  

                  <Label title='Description' icon='ios-document-outline' />
                  <Input
                     value={this.state.description}
                     onChangeText={description => this.setState({ description })}
                     style={{marginBottom: 25}} 
                     returnKeyType='next'
                     reference={input => this.inputs['description'] = input}
                     onSubmitEditing={() => this.handleFocusNextField('audienceSize')} />
                     />  

                  <Label title='Audience size' icon='ios-people-outline' />
                  <Input
                     value={this.state.tagData.audienceSize}
                     onChangeText={size => this.setState({
                        tagData: {
                           ...this.state.tagData,
                           audienceSize: size
                        }
                     })}
                     reference={input => this.inputs['audienceSize'] = input}
                     keyboardType="numeric" />
                  
                  <Label title='Duration (minutes)' icon='ios-clock-outline' />
                  <Input 
                     value={this.state.tagData.duration}
                     onChangeText={duration => this.setState({
                        tagData: {
                           ...this.state.tagData,
                           duration
                        }
                     })}
                     keyboardType="numeric" />
                  
                  <Label title='Price (€)' icon='ios-pricetag-outline' />
                  <Input 
                     value={this.state.tagData.price}
                     onChangeText={price => this.setState({
                        tagData: {
                           ...this.state.tagData,
                           price
                        }
                     })}
                     keyboardType="numeric"
                     returnKeyType='done' />

                  <View style={styles.boolRow} >
                     <Label title='Audio' icon='ios-musical-note-outline' />
                     <Switch 
                        value={this.state.tagData.audio}
                        onValueChange={() => 
                           this.setState({
                              tagData: {
                                 ...this.state.tagData,
                                 audio: !this.state.tagData.audio
                              }
                           })
                        } 
                     />
                  </View>

                  <View style={styles.boolRow}>
                     <Label title='Car to door' icon='ios-car-outline' />
                     <Switch
                        value={this.state.tagData.carToDoor}
                        onValueChange={() => 
                           this.setState({
                              tagData: {
                                 ...this.state.tagData,
                                 carToDoor: !this.state.tagData.carToDoor
                              }
                           })
                        } 
                     />
                  </View>

                  <View style={[styles.boolRow]}>
                     <Label title='Electricity' fontAwesomeIcon='bolt' />
                     <Switch
                        value={this.state.tagData.electricity}
                        onValueChange={() => 
                           this.setState({
                              tagData: {
                                 ...this.state.tagData,
                                 electricity: !this.state.tagData.electricity
                              }
                           })
                        }
                     />
                  </View>
               </ScrollView>
            </View>
         </TouchableWithoutFeedback>
      )
   }
}

const styles = {
   boolRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#cacdd1',
      paddingBottom: 10,
      marginBottom: 15,
   }
}


export default connect(null, actions)(PerformanceEdit);
