import React, {Component} from 'react';
import { View, Text, TextInput, Image, Dimensions, Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '../UI/Input';
import ButtonAuth from '../UI/Button_Auth';
import ViewContainer from '../UI/View';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Modal from '../UI/Modal';
import Ionicons from '../../node_modules/@expo/vector-icons/Ionicons';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


class LoginForm extends Component {
   static navigationOptions = {
      header: null,
   }
   constructor(props) {
      super(props);
      this.state = {
         email: 'vinh@test.com', password: '', 
         isSpinnershowed: false, 
         error: '',
      };
      this.keyboardHeight = new Animated.Value(0);
      this.inputs = {};
   }

   // add event listener for keyboard to show up
   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
      // render image
      this.image = <Image 
                     source={require('../../images/background.jpg')} 
                     style={{ 
                        width: DEVICE_WIDTH, 
                        height: DEVICE_HEIGHT,
                        position: 'absolute',
                        zIndex: 0,
                        alignSelf: 'stretch',
                        opacity: 0.8 }}
                  />
   }

   componentWillUnmount() {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
   }

   // callbacks
   keyboardWillShow = (event) => {
      // this.setState({ flexNumber: 0.7})
      Animated.timing(this.keyboardHeight, {
         duration: event.duration,
         toValue: event.endCoordinates.height,
      }).start();
   };

   keyboardWillHide = (event) => {
      // this.setState({ flexNumber: 0.4})      
      Animated.timing(this.keyboardHeight, {
         duration: event.duration,
         toValue: 10,
      }).start();
   };

   handleSubmit = () => {
      this.setState({ isSpinnershowed: true })
      const { email, password } = this.state;
      this.props.login(email, password, () => {
         // clear input after logging in
         this.setState({ password: '', isSpinnershowed: false })
         this.props.navigation.navigate('Dashboard');
      },
      (error) => {
         this.setState({ error, isSpinnershowed: false })
      }
   );
   }

   // enable loggin in right after tapping 'Done' button
   handleLogin = () => this.handleSubmit();

   render() {
      console.log(this.state.error.code)
      const color = {
         inputColor: '#6a6b6d',
      }

      const styles = {
         container: {
            height: this.state.error.code ? DEVICE_HEIGHT / 2.2 : DEVICE_HEIGHT / 2.5,
            width: '95%',
            marginLeft: 'auto',
            marginRight: 'auto',
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: 20,
            paddingBottom: 10,
            borderRadius: 5,
         },
         title: {
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '600',
            paddingBottom: 20,
         },
         button: {
            marginTop: 20,
            marginBottom: 0,
         },
         backButton: {
            position: 'absolute',
            left: 12,
            paddingRight: 10,
         },

      }
      // dynamically disable button
      let disableStatus;
      this.state.email === '' || this.state.password === '' ? disableStatus = true : disableStatus = false;
      return(
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
         <View style={{ flex: 1, justifyContent: 'center' }}>
            {this.image}
            {
               this.state.isSpinnershowed ?
                  <Modal
                     title="Signing in"
                     textColor='#1a4b93'
                     spinnerSize='small'
                     bannerBackgroundColor='white' />
               : null
            }
            <Animated.View style={[styles.container, { marginBottom: this.keyboardHeight } ]}>
            <ViewContainer>
                  <Text style={styles.title}>Sign into Gigle</Text>
                  <Ionicons name='ios-arrow-back' size={25} style={styles.backButton} color='#2b6edb' onPress={() => this.props.navigation.navigate('Signup')} />
                  <Input 
                     placeholder="Email"
                     value={this.state.email}
                     onChangeText={email => this.setState({ email, error: {} })}
                     keyboardType="email-address"
                     autoFocus
                     returnKeyType="next"
                     inputStyle={{ color: color.inputColor }}
                     reference={input => this.inputs['email'] = input}
                     onSubmitEditing={() => this.inputs['password'].focus() }
                  />
                  {/* display email-relatederror */}
                  {
                     this.state.error.code === "auth/invalid-email" 
                     || this.state.error.code === "auth/user-not-found"
                     ?
                     <Text style={{ color: 'red' }}>{this.state.error.message}</Text>
                     : null
                  }

                  <Input 
                     placeholder="Password"
                     value={this.state.password}
                     onChangeText={password => this.setState({ password, error: {} })}
                     inputStyle={{ color: color.inputColor }}
                     secureTextEntry
                     returnKeyType='done'
                     reference={input => this.inputs['password'] = input}
                     onSubmitEditing={this.handleLogin}
                  />
                  
                  {
                     this.state.error.code === "auth/wrong-password" 
                     // || this.state.error.code === "auth/user-not-found"
                     ?
                     <Text style={{ color: 'red', marginBottom: 10 }}>{this.state.error.message}</Text>
                     : null
                  }
                  
                  <ButtonAuth
                     title="Log In" 
                     onPress={this.handleSubmit}
                     style={styles.button}
                     disabled={disableStatus} />

                  
            </ViewContainer>
            </Animated.View>
         </View>
         </TouchableWithoutFeedback>
      );
   }
}

export default connect(null, actions)(LoginForm);