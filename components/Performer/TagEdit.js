import React, { Component } from 'react'
import { View, Text } from 'react-native';
import Header from '../UI/Header';

class TagEdit extends Component {
   render() {
      const { navigation } = this.props;
      return (
         <View>
            <Header
               headerName="Your tags"
               notShowIcon headerRightTitle="Done"
               navigateBack={() => navigation.goBack()} />
         </View>
      )
   }
}


export default TagEdit;
