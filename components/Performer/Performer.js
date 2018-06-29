import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import request from 'superagent';
import _ from 'lodash';

import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../UI/Modal';
import AddButton from '../UI/AddButton';
import AddModal from '../UI/AddModal';
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

   state = {showAddButton: true, showAddModal: false};

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
         <TouchableWithoutFeedback onPress={() => this.setState({ showAddModal: false })} >
         <View style={{ flex: 1 }}>
            <ScrollView>
               <View>
                  {performerList}
               </View>
            </ScrollView>
            {
               this.state.showAddButton
               ?
               <View style={{ position: 'absolute', bottom: 20, right: 20}}>
                  <AddButton style={{ zIndex: 100000}} onPress={() => this.setState({ showAddButton: false, showAddModal: true })}/>
               </View>
               : null
            }
            
            {
               this.state.showAddModal 
               ?
               <AddModal 
                  isModalShowed={this.state.showAddModal}
                  handleCloseModal={() => this.setState({ showAddModal: false })}
                  handleShowAddButton={() => this.setState({ showAddButton: true })}
                  navigation={this.props.navigation} />
               : null
            }
         </View>
         </TouchableWithoutFeedback>
      );
   }
}

export default Performer;