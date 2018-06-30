import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Map from '../Location/Map';

class MapFullScreen extends Component {
   static navigationOptions = {
      header: null,
   }

   render() {
      const {location} = this.props.navigation.state.params;
      return(
         <View style={{ flex: 1}}>
            <View style={{ flex: 1, position: 'absolute', top: 30, left: 15, zIndex: 1000 }}>
               <Icon name="times-circle" size={30} onPress={() => this.props.navigation.goBack()} />
            </View>
            <Map location={location} />
         </View>
      )
   }
}

export default MapFullScreen;