import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Spinner from './UI/Spinner';

class Loading extends Component {
   state = { isLogin: false }

   componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({ isLogin: true });
            this.props.navigation.navigate('Signup');
         } else {
            this.setState({
               isLogin: false,
            });
            this.props.navigation.navigate('Login');
            
         }
      });
   }

   render() {
      return(
         <Spinner animating={!this.state.isLogin} />
      );
   }
}



export default Loading;