import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Spinner from './UI/Spinner';

class Loading extends Component {
   state = { isLogin: false }

   componentDidMount() {
      // var config = {
      //    apiKey: "AIzaSyBQKxPJo3KvbF3VHobpXbQpS-yB8hdCmcg",
      //    authDomain: "gigs-2cb8b.firebaseapp.com",
      //    databaseURL: "https://gigs-2cb8b.firebaseio.com",
      //    projectId: "gigs-2cb8b",
      //    storageBucket: "",
      //    messagingSenderId: "936084268710"
      // };
      // firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({ isLogin: true });
            this.props.navigation.navigate('login');
         } else {
            this.setState({
               isLogin: false,
            });
            this.props.navigation.navigate('login');
            
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