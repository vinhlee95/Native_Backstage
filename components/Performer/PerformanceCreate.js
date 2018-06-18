import React, { Component } from 'react'
import { View, Text } from 'react-native';
import Header from '../UI/Header';

class PerformanceCreate extends Component {
  render() {
    return (
      <View>
         <Header
            headerName="New performance"
            notShowIcon headerRightTitle = "Done"
            navigateBack={() => this.props.navigation.goBack()} />
      </View>
    )
  }
}

export default PerformanceCreate;
