import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import request from 'superagent';
import _ from 'lodash';

import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../UI/Modal';
import AddButton from '../UI/AddButton';
import AddModal from '../UI/AddModal';
import PerformerItem from './PerformerItem';

import { connect } from 'react-redux';
import * as actions from '../../actions';


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
      this.props.fetchPerformerData();
   }

   render() {
      if(!this.props.personalData || !this.props.productData) {
         return <Modal 
                  title="Loading your performance"
                  spinnerSize="small"
                  bannerBackgroundColor="white" />
      }
      let performerList;
      if(this.props.personalData && this.props.productData) {
         const { personalData, productData } = this.props;
         const products = _.toArray(productData).slice(0,1);
         const updatedProducts = products.concat(this.props.performanceData);
         console.log(this.props.performanceData)

         performerList = <PerformerItem 
                  // key={performer.data.id}
                  performerData={personalData}
                  productData={updatedProducts}
                  handleViewPerformerInfo={() => {
                     this.props.navigation.navigate('PerformerInfo', {
                        performerData: personalData
                     });
                  }}
                  navigation={this.props.navigation}
               />
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

const mapStateToProps = ({ performerData, performanceData }) => {
   return {
      personalData: performerData.personalData,
      productData: performerData.productData,
      performanceData
   };
}

export default connect(mapStateToProps, actions)(Performer);