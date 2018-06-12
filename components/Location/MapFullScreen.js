import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Spinner from '../UI/Spinner';

class MapFullScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         header: null,
      }
   }

   state = {
      isSpinnerShowed: true
   }

   componentDidMount() {
      this.props.loadData(() => {
         this.setState({ isSpinnerShowed: false })
      });
   }

   render() {
      console.log(this.props.location)
      if(this.state.isSpinnerShowed) {
         return <Spinner />;
      }
      return (
         <View style={{flex:1}}>
            <Map 
               location={this.props.location} 
               scrollEnabled={false}  
               // onPress={() => this.setState({ isMapFullScreen: true })}
               style={{ height: 300}} />
         </View>
      )
   }
}

const mapStateToProps = ({ data }) => {
   return { location: data.location }
}

export default connect(mapStateToProps, actions)(MapFullScreen);
