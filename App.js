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
import Performer from './components/Performer/Performer';
import Calendar from './components/Calendar';
import Account from './components/Authentication/Account';
import Profile from './components/Info/Profile';
import Loading from './components/Loading';
import PerformerInfo from './components/Performer/PerformerInfo';
import PerformanceInfo from './components/Performer/PerformanceInfo';
import PerformerCreate from './components/Performer/PerformerCreate';
import PerformanceCreate from './components/Performer/PerformanceCreate';
import TagEdit from './components/Performer/TagEdit';
import NewTag from './components/Performer/NewTag';

export default class App extends React.Component {

  // // landscape orientation
  // componentDidMount() {
  //   Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  // }

  // componentWillUnmount() {
  //   Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  // }


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
      authentication: createStackNavigator({
        Signup: SignupForm,        
        Login: LoginForm,
      },{ initialRouteName: 'Signup'}),      
      setting: createStackNavigator({
        Account: Account,
        Profile: Profile,
        PerformerInfo: PerformerInfo,
        PerformanceInfo: PerformanceInfo,
        PerformerCreate: PerformerCreate,
        PerformanceCreate: PerformanceCreate,
        TagEdit: TagEdit,
        NewTag: NewTag,
        main: createMaterialBottomTabNavigator({
          Dashboard: Dashboard,
          Performer: Performer,
          Calendar: Calendar,
        }, {
          navigationOptions: {
            labeled: false,
            shifting: true,
            barStyle: {
              backgroundColor: '#eff3f9',
              borderTopColor: '#cacdd1',
              borderWidth: .5,
            }
          }
        })
      }, {
        initialRouteName: 'main',
        headerMode: 'none'
      }),
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
