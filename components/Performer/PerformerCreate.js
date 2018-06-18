import React, { Component } from 'react'
import { View, Text } from 'react-native';
import Header from '../UI/Header';

class PerformerCreate extends Component {
  render() {
    return (
      <View>
         <Header
            headerName="New performer"
            notShowIcon headerTitileRight="Done"
            navigateBack={() => this.props.navigation.goBack()} />
      </View>
    )
  }
}

export default PerformerCreate;
