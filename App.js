import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Provider } from 'react-redux';
import store from './store';
import firebase from 'firebase';
import { AppLoading, Notifications } from 'expo';
import registerNotification from './services/push_notification';

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
import Welcome from './components/Welcome/Welcome';

import { HeaderRightIcon } from './components/UI/Header/index.js';
import MapFullScreen from './components/Info/MapFullScreen';

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

  componentDidMount() {
      registerNotification();
      Notifications.addListener((notification) => {
         const { text } = notification.data;
         const { origin } = notification;

         if(text && origin === 'received') {
            Alert.alert(
               'Hello from Gigle',
               text, [{
                  text: 'OK'
               }]
            )
         }
      });
   }

  render() {
      const main = createMaterialBottomTabNavigator({
            Dashboard: Dashboard,
            Performer: Performer,
            Calendar: Calendar,
      }, {
         labeled: false,
         shifting: true,
         barStyle: {
            backgroundColor: '#eff3f9',
            borderTopColor: '#cacdd1',
            borderWidth: .5,
         }
      });
      main.navigationOptions = ({ navigation }) => {
         let { routeName } = navigation.state.routes[navigation.state.index];
         let headerTitle = routeName;
         return {
            headerTitle,
            headerTitleStyle: {
               fontSize: 20, color: 'white'
            },
            headerStyle: {
               backgroundColor: '#1a4b93',
            },
            headerRight: <HeaderRightIcon navigation={navigation} />
         };
      }
      const MainNavigator = createBottomTabNavigator({
         Loading: Loading,      
         authentication: createStackNavigator({
            Welcome: Welcome,
            Signup: SignupForm,        
            Login: LoginForm,
         },{ initialRouteName: 'Welcome' }),      
         setting: createStackNavigator({
            Account: Account,
            Profile: Profile,
            MapFullScreen: MapFullScreen,
            PerformerInfo: PerformerInfo,
            PerformanceInfo: PerformanceInfo,
            PerformerCreate: PerformerCreate,
            PerformanceCreate: PerformanceCreate,
            TagEdit: TagEdit,
            NewTag: NewTag,
            main: main
         }, {
         initialRouteName: 'main',
         //   headerMode: 'none'
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
