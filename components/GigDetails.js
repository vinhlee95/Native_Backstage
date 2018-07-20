import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import { HeaderTitle } from './UI/Header/index.js';
import ListItem from './UI/ListItem.js';

class GigDetails extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Gig Details" />,
         headerStyle: {
            backgroundColor: '#1a4b93',
         },
         headerTintColor: 'white',
      }
   }

   constructor(props) {
      super(props);
      // retrieve data from gig details
      const {
         gigDate, gigTime, gigAddress, product, customerName, customerEmail
      } = this.props.navigation.state.params.gigDetails;
      this.state = {
         gigDate, gigTime, gigAddress, product, customerName, customerEmail
      }
   }


   render() {
      console.log(this.state.gigDate)
      return (
         <ScrollView>
            <ListItem
               icon='ios-calendar-outline'
               title='Date'
               rightTitle={this.state.gigDate}
               noArrow
            />
            <ListItem
               icon='ios-clock-outline'
               title='Time'
               rightTitle={this.state.gigTime}
               noArrow
            />
            <ListItem
               icon='ios-person-outline'
               title='Customer Name'
               rightTitle={this.state.customerName}
               noArrow
            />
            <ListItem
               icon='ios-mail-outline'
               title='Customer Email'
               rightTitle={this.state.customerEmail}
            />
         </ScrollView>
      )
   }
}

export default GigDetails;