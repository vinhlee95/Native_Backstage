import React, { Component } from 'react'
import { View, Text, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import ViewContainer from '../UI/View';
import Input from '../UI/Input';
import Button from '../UI/Button';

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
      console.log(this.state)
      const { audienceSize, duration, price, audio, carToDoor, electricity } = this.state;
      return (
         <View style={{flex:1, backgroundColor: 'white'}}>
            <ViewContainer style={{ marginTop: 15 }}>
               <ScrollView>
                  <View style={styles.label}>
                     <Ionicons name="ios-people" size={25} />
                     <Text style={styles.labelText}>Audience size</Text>
                  </View>
                  <Input
                     value={this.state.audienceSize}
                     onChangeText={size => this.setState({ audienceSize: size })}
                     keyboardType="numeric" />
                  
                  <View style={styles.label}>
                     <Ionicons name="ios-clock" size={25} />
                     <Text style={styles.labelText}>Duration (minutes)</Text>
                  </View>
                  <Input 
                     value={this.state.duration}
                     onChangeText={duration => this.setState({ duration: duration})}
                     keyboardType="numeric" />
                  
                  <View style={styles.label}>
                     <Ionicons name="ios-pricetag" size={25} />
                     <Text style={styles.labelText}>Price (€)</Text>
                  </View>
                  <Input 
                     value={this.state.price}
                     onChangeText={price => this.setState({ price: price})}
                     keyboardType="numeric" />

                  <View style={styles.boolRow} >
                     <View style={styles.label}>
                        <Ionicons name="ios-musical-note" size={25} />
                        <Text style={styles.labelText}>Audio</Text>
                     </View>
                     <Switch 
                        value={this.state.audio}
                        onValueChange={() => this.setState({ audio: !this.state.audio})} />
                  </View>

                  <View style={styles.boolRow}>
                     <View style={styles.label}>
                        <Ionicons name="ios-car" size={25} />
                        <Text style={styles.labelText}>Car to door</Text>
                     </View>
                     <Switch
                        value={this.state.carToDoor}
                        onValueChange={() => this.setState({ carToDoor: !this.state.carToDoor})}/>
                  </View>

                  <View style={styles.boolRow}>
                     <View style={styles.label}>
                        <Icon name="bolt" size={25} />
                        <Text style={styles.labelText}>Electricity</Text>
                     </View>
                     <Switch
                        value={this.state.electricity}
                        onValueChange={() => this.setState({ electricity: !this.state.electricity})}/>
                  </View>
               </ScrollView>
            </ViewContainer>
         </View>
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
      fontSize: 18,
      fontWeight: 'bold',
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


export default TagEdit;
