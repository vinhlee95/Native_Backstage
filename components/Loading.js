import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

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
         <View style={styles.loadingContainer}>
            <ActivityIndicator animating={!this.state.isLogin} size="large" color="#0000ff" />
         </View>
      );
   }
}

const styles = {
   loadingContainer: {
      flex: 1,
      justifyContent: 'center'
   }
}

export default Loading;