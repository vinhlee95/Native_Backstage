import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import request from 'superagent';
import _ from 'lodash';

import Modal from '../UI/Modal';
import AddButton from '../UI/AddButton';
import AddModal from '../UI/AddModal';
import PerformerItem from './PerformerItem';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import * as actions from '../../actions';


class Performer extends Component {
   static navigationOptions = {
      tabBarIcon: ({ focused }) => (
         focused
         ?
         <Ionicons name="ios-people" size={32} color="#1a4b93" />
         :
         <Ionicons name="ios-people" size={32} color="#8f9193" />
      )
   }

   state = {showAddButton: true, showAddModal: false};

   componentDidMount() {
      this.props.fetchPerformerData();
   }

   render() {
      if(!this.props.performerData) {
         return <Modal 
                  title="Loading your performance"
                  spinnerSize="small"
                  bannerBackgroundColor="white" />
      }
      let performerList;
      const { performerData } = this.props;
      performerList = performerData.map((performer, id) => {
         const personalData = performer.data;
         console.log(personalData)
         // take only first 2 performance for a more compact list
         const productData = _.toArray(performer.products).slice(0,1);
         // console.log(productData)
         // console.log(productData)
         // add local performance data to server one
         let updatedProductData;
         // check whether localData is an empty object
         if (_.isEmpty(this.props.localPerformanceData)) {
            updatedProductData = productData;
         } else {
            updatedProductData = productData.concat(this.props.localPerformanceData);
         }
         return (
            <PerformerItem 
               key={id}
               performerData={personalData}
               productData={updatedProductData}
               handleViewPerformerInfo={() => {
                  this.props.navigation.navigate('PerformerInfo', {
                     performerData: personalData
                  });
               }}
               navigation={this.props.navigation}
            />
         )
      });
                  
      return(
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
      );
   }
}

const mapStateToProps = ({ performerData, localPerformanceData }) => {
   // console.log(localPerformanceData)
   return {
      performerData,
      localPerformanceData
   };
}

export default connect(mapStateToProps, actions)(Performer);