import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Header from '../UI/Header';

export default class Account extends Component {


  render() {
      const { state, goBack } = this.props.navigation;
      const params = state.params || {};
      return (
         <View style={{flex:1}}>
            <Header 
               headerName="Account" 
               notShowIcon showDone
               navigateBack={() => this.props.navigation.navigate('Dashboard')} />
         </View>
      )
   }
}
