import React, { Component } from 'react'
import { View, Text, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../UI/Header';
import ViewContainer from '../UI/View';
import Input from '../UI/Input';
import Button from '../UI/Button';

class TagEdit extends Component {
   constructor(props) {
      super(props);
      this.state = {
         audienceSize: '', 
         performanceDuration: '', 
         price: '', 
         audio: false, 
         carToDoor: false, 
         electricity: false,
      }
   }
   render() {
      return (
         <View style={{flex:1, backgroundColor: 'white'}}>
            <Header
               headerName="Add tags"
               notShowIcon headerRightTitle="Done"
               navigateBack={() => this.props.navigation.goBack()} />
            <ViewContainer style={{ marginTop: 15 }}>
               <ScrollView>
                  <View style={styles.label}>
                     <Ionicons name="ios-people" size={25} />
                     <Text style={styles.labelText}>Audience size</Text>
                  </View>
                  <Input
                     value={this.state.audienceSize}
                     onChange={size => this.setState({ audienceSize: size })}
                     keyboardType="numeric" />
                  
                  <View style={styles.label}>
                     <Ionicons name="ios-clock" size={25} />
                     <Text style={styles.labelText}>Duration (minutes)</Text>
                  </View>
                  <Input 
                     value={this.state.performanceDuration}
                     onChange={duration => this.setState({ performanceDuration: duration})}
                     keyboardType="numeric" />
                  
                  <View style={styles.label}>
                     <Ionicons name="ios-pricetag" size={25} />
                     <Text style={styles.labelText}>Price (€)</Text>
                  </View>
                  <Input 
                     value={this.state.price}
                     onChange={price => this.setState({ price: price})}
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
                  <Button 
                     title="Save information"
                     onPress={() => console.log('Info saved')} />
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
