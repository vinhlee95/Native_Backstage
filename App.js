import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import LoginForm from './components/Authentication/Login';
import SignupForm from './components/Authentication/Signup';
import Dashboard from './components/Dashboard';

export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      auth: createStackNavigator({
        login: LoginForm,
        signup: SignupForm,
      }),
      dashboard: Dashboard,
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
