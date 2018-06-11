import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Provider } from 'react-redux';
import store from './store';
import firebase from 'firebase';
import { AppLoading } from 'expo';

import LoginForm from './components/Authentication/Login';
import SignupForm from './components/Authentication/Signup';
import Dashboard from './components/Dashboard';
import Performer from './components/Performer';
import Calendar from './components/Calendar';
import Account from './components/Authentication/Account';
import Profile from './components/Profile';
import Loading from './components/Loading';

export default class App extends React.Component {


  componentWillMount() {
    var config = {
    apiKey: "AIzaSyATiuCvBYsbvwD6crTDGRGYA4kgWaWTluE",
    authDomain: "backstage-mobile.firebaseapp.com",
    databaseURL: "https://backstage-mobile.firebaseio.com",
    projectId: "backstage-mobile",
    storageBucket: "backstage-mobile.appspot.com",
    messagingSenderId: "193289166623"
  };
  firebase.initializeApp(config);
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      Loading: Loading,
      login: LoginForm,
      signup: SignupForm,
      account: Account,
      main: createMaterialBottomTabNavigator({
        Dashboard: Dashboard, 
        Performer: Performer,
        Calendar: Calendar,
        Profile: Profile, 
      },
      {
        navigationOptions: {
          labeled: false,
          shifting: true,
          barStyle: {
            backgroundColor: '#eff3f9',
            borderTopColor: '#cacdd1',
            borderWidth: .5,
          }          
        }
      }
      )
    },
    {
      navigationOptions: {
        tabBarVisible: false,
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
