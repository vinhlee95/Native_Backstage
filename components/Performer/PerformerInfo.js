import React, { Component } from 'react'
import { View, Text, Image } from 'react-native';
import Modal from '../UI/Modal';
import Header from '../UI/Header';
import Input from '../UI/Input';

class PerformerInfo extends Component {
   render() {
      // console.log(this.props.navigation.state.params.performerData);
      // if(!this.props.performerData) {
      //    return (
      //       <Modal title="Loading your data" spinnerSize="small" />
      //    );
      // }
      const { name, profilePic } = this.props.navigation.state.params.performerData;
      return (
         <View>
            <Header 
               headerName="Your Information" 
               notShowIcon headerRightTitle="Done"
               navigateBack={() => this.props.navigation.goBack()} />
            <View style={styles.imageContainer}>
               <Image source={{uri:profilePic}} style={styles.image} />
            </View>
         </View>
      )
   }
}

const styles = {
   imageContainer: {
      flex: 1,
   },
   image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginLeft: 'auto',
      marginRight: 'auto'
   }
}

export default PerformerInfo;
