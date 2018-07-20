import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import _ from 'lodash';

import Modal from '../UI/Modal';
import AddButton from '../UI/AddButton';
import AddModal from '../UI/AddModal';
import ListItem from '../UI/ListItem';
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

   state = {showAddButton: true, showAddModal: false, };

   componentWillMount() {
      this.props.fetchPerformerData();
   }

   render() {
      if(!this.props.performerData) {
         return <Modal 
                  title="Loading your performance"
                  spinnerSize="small"
                  bannerBackgroundColor="white" />
      }
      let performerList, performerNameList=[]; 
      const { performerData } = this.props;
      // console.log(performerData)

      // take a lít of name of performer for rendering in performance create 
      performerData.forEach(performer => {
         if(!performer.data.name) {
            performerNameList.push('');
         } else {
            performerNameList.push(performer.data.name)
         }
      });
      performerList = performerData.map((performer, id) => {
         const personalData = performer.data;
         const productData = _.toArray(performer.products).splice(0,2);
         // console.log(productData)
         let updatedProductData = productData;
         const {localPerformanceData}= this.props; // console.log(localPerformanceData)

         // add performance to equivalent performer
         if(!_.isEmpty(localPerformanceData)) {
            localPerformanceData.forEach(performance => {
               if(!performance.performerData) {console.log('error')}
               if(performance.performerData.name === personalData.name) {
                  updatedProductData.push(performance);
               }
            })
         } 
         return (
            <PerformerItem 
               key={id}
               performerData={personalData}
               productData={updatedProductData}
               handleViewPerformerInfo={() => {
                  this.props.navigation.navigate('PerformerInfo', {
                     performerData: personalData,
                     productData: updatedProductData
                  });
               }}
               navigation={this.props.navigation}
               performerNameList={performerNameList}
            />
         )
      });
                  
      return(
         <View style={{ flex: 1 }}>
            <ScrollView>
               <View>
                  {performerList}

                  <ListItem
                     title='Add performer...'
                     icon='ios-person-add-outline'
                     leftIconSize={60}
                     titleContainerStyle={{borderBottomWidth: 0}}
                     iconColor='#b4bac4'
                     titleTextStyle={{color: '#b4bac4'}}
                     onPress={() => this.props.navigation.navigate('PerformerCreate')}
                  />
               </View>
            </ScrollView>
            {/* {
               this.state.showAddButton
               ?
               <View style={{ position: 'absolute', bottom: 20, right: 20}}>
                  <AddButton style={{ zIndex: 100000}} onPress={() => this.setState({ showAddButton: false, showAddModal: true })}/>
               </View>
               : null
            } */}
            
            {/* {
               this.state.showAddModal 
               ?
               <AddModal 
                  isModalShowed={this.state.showAddModal}
                  handleCloseModal={() => this.setState({ showAddModal: false })}
                  handleShowAddButton={() => this.setState({ showAddButton: true })}
                  navigation={this.props.navigation}
                  performerNameList={performerNameList}
                  />
               : null
            } */}
         </View>
      );
   }
}

const mapStateToProps = ({ performerData, localPerformanceData }) => {
   console.log(performerData)
   return {
      performerData,
      localPerformanceData
   };
}

export default connect(mapStateToProps, actions)(Performer);