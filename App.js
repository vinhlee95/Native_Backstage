import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import firebase from 'firebase';

import LoginForm from './components/Authentication/Login';
import SignupForm from './components/Authentication/Signup';
import Dashboard from './components/Dashboard';
import Performer from './components/Performer';
import Calendar from './components/Calendar';
import Profile from './components/Profile';

export default class App extends React.Component {

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyBQKxPJo3KvbF3VHobpXbQpS-yB8hdCmcg",
      authDomain: "gigs-2cb8b.firebaseapp.com",
      databaseURL: "https://gigs-2cb8b.firebaseio.com",
      projectId: "gigs-2cb8b",
      storageBucket: "",
      messagingSenderId: "936084268710"
    };
    firebase.initializeApp(config);
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      auth: createStackNavigator({
        login: LoginForm,
        signup: SignupForm,
      }),
      main: createBottomTabNavigator({
        Dashboard: Dashboard, 
        Performer: Performer,
        Calendar: Calendar,
        Profile: Profile, 
      })
    },
    {
      navigationOptions: {
        tabBarVisible: false
      }
    }
    );
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator / >
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});
