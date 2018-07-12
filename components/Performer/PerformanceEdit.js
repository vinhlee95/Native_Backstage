import React, { Component } from 'react'
import { View, Text, ScrollView, Switch, TouchableWithoutFeedback, Keyboard, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import ViewContainer from '../UI/View';
import Input from '../UI/Input';

import { HeaderTitle, HeaderLeftTitle, HeaderRightTitle } from '../UI/Header/index.js';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class PerformanceEdit extends Component {
   // render Header
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Edit performance" />,
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
      const { navigation } = this.props;
      const { params } = navigation.state;
      const { audienceSize, duration, audio, carToDoor, price, electricity } = params.tagData;
      const { title, name, description, id } = params;
      this.state = {
         title, name, description, id,
         tagData: {
            audienceSize, duration, audio, carToDoor, price, electricity,
         }
      }
      this.inputs = {};
   }

   componentWillMount() {
      this.props.navigation.setParams({
         saveTag: this.goBack
      })
   }

   goBack = () => {
      const { navigation } = this.props;
      navigation.state.params.returnData(this.state);
      navigation.navigate('Performer');
   }

    handleFocusNextField = (fieldID) => {
       this.inputs[fieldID].focus();
    }

    handleDeletePerformance = () => {
      const { id } = this.state;
      Alert.alert(
         'Delete performance',
         'Are you sure to delete this performance?',
         [
            {text: 'Cancel'},
            {text: 'Ok', onPress: () => {
               this.props.deletePerformance(id);
               this.props.navigation.navigate('Performer');
            }}
         ],
         { cancelable: true }
      )
    }

   render() {
      console.log(this.state)
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{backgroundColor: 'white', paddingTop: 20, paddingLeft: '2.5%', paddingRight: '2.5%' }}>
               <ScrollView>
                  <View style={styles.label}>
                     <Ionicons name="ios-person" size={25} />
                     <Text style={styles.labelText}>Performer name</Text>
                  </View>
                  <Input
                     value={this.state.name}
                     onChangeText={name => this.setState({ name })}
                     style={{marginBottom: 25}} 
                     returnKeyType='next'
                     onSubmitEditing={() => this.handleFocusNextField('performanceName')} />
                     />
                  <View style={styles.label}>
                     <Ionicons name="ios-create" size={25} />
                     <Text style={styles.labelText}>Performance name</Text>
                  </View>
                  <Input
                     value={this.state.title}
                     onChangeText={title => this.setState({ title })}
                     style={{marginBottom: 25}} 
                     returnKeyType='next'
                     reference={input => this.inputs['performanceName'] = input}
                     onSubmitEditing={() => this.handleFocusNextField('description')} />
                     />  

                  <View style={styles.label}>
                     <Ionicons name="ios-document" size={25} />
                     <Text style={styles.labelText}>Performance description</Text>
                  </View>
                  <Input
                     value={this.state.description}
                     onChangeText={description => this.setState({ description })}
                     style={{marginBottom: 25}} 
                     returnKeyType='next'
                     reference={input => this.inputs['description'] = input}
                     onSubmitEditing={() => this.handleFocusNextField('audienceSize')} />
                     />  

                  <View style={styles.label}>
                     <Ionicons name="ios-people" size={25} />
                     <Text style={styles.labelText}>Audience size</Text>
                  </View>
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
                  
                  <View style={styles.label}>
                     <Ionicons name="ios-clock" size={25} />
                     <Text style={styles.labelText}>Duration (minutes)</Text>
                  </View>
                  <Input 
                     value={this.state.tagData.duration}
                     onChangeText={duration => this.setState({
                        tagData: {
                           ...this.state.tagData,
                           duration
                        }
                     })}
                     keyboardType="numeric" />
                  
                  <View style={styles.label}>
                     <Ionicons name="ios-pricetag" size={25} />
                     <Text style={styles.labelText}>Price (€)</Text>
                  </View>
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
                     <View style={styles.label}>
                        <Ionicons name="ios-musical-note" size={25} />
                        <Text style={styles.labelText}>Audio</Text>
                     </View>
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
                     <View style={styles.label}>
                        <Ionicons name="ios-car" size={25} />
                        <Text style={styles.labelText}>Car to door</Text>
                     </View>
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
                     <View style={styles.label}>
                        <Icon name="bolt" size={25} />
                        <Text style={styles.labelText}>Electricity</Text>
                     </View>
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
                  <View style={{
                     marginBottom: 20,
                     borderTopWidth: 1, borderBottomWidth: 1,
                     paddingTop: 5, paddingBottom: 5,
                     borderColor: 'lightgrey'
                  }}>
                     <Button
                        color='red'
                        title='Delete this performance'
                        onPress={this.handleDeletePerformance}
                     />
                  </View>
               </ScrollView>
            </View>
         </TouchableWithoutFeedback>
      )
   }
}

const styles = {
   label: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
   },
   labelText: {
      fontSize: 20,
      fontWeight: '600',
      marginLeft: 10,
   },
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