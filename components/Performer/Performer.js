import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import request from 'superagent';
import _ from 'lodash';

import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../UI/Header';
import Modal from '../UI/Modal';
import PerformerItem from './PerformerItem';


class Performer extends Component {
   static navigationOptions = {
      tabBarIcon: ({ focused, tintColor }) => (
         focused
         ?
         <Icon name="fire" size={24} color="#1a4b93" />
         :
         <Icon name="fire" size={24} />
      )
   }

   state = {};

   componentDidMount() {
      request
         .post('https://nodedev.gigleapp.com/user')
         .send({
            action: 'getPerformersAndProducts',
            userId: 'ZuaqGwjNc6M47HchSJYVa2lunf03'
         })
         .end((err, res) => {
            res ? this.setState({ performers: _.toArray(res.body) }) : console.log('Error fetching')
         });
   }

   render() {
      if(!this.state.performers) {
         return <Modal 
                  title="Loading your performance"
                  spinnerSize="small"
                  bannerBackgroundColor="white" />
      }
      let performerList;
      if(this.state.performers) {
         // alter data to array
         performerList = this.state.performers.map(performer => {
            return(
               <PerformerItem 
                  key={performer.data.id}
                  performerData={performer.data}
                  productData={_.toArray(performer.products)}
                  handleViewPerformerInfo={() => {
                     this.props.navigation.navigate('PerformerInfo', {
                        performerData: performer.data
                     });
                  }}
                  navigation={this.props.navigation}
               />
            );
         });
      }

      return(
         <View style={{ flex: 1 }}>
            <Header 
               headerName = "All performance" 
               // get some bottom space for the p character
               headerStyle={{ paddingBottom: 5 }}
               onPress={() => {
                  this.props.navigation.navigate('Account');
               }} />
            <ScrollView>
               <View>
                  {performerList}
               </View>
            </ScrollView>
         </View>
      );
   }
}

export default Performer;