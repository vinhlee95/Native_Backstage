import React, {Component} from 'react';
import { View, Text, Image, Dimensions, Animated, Keyboard, TouchableHighlight, TouchableWithoutFeedback  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ViewContainer from '../UI/View';
import ButtonAuth from '../UI/Button_Auth';
import Input from '../UI/Input';
import Modal from '../UI/Modal';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class SignupForm extends Component {
   static navigationOptions = {
      header: null,
   }
   constructor(props) {
      super(props);
      this.state = {
         email: '', password: '', isSpinnershowed: false, error: '',
      };
      this.keyboardHeight = new Animated.Value(0);
      this.inputs = {};
   }

   // add event listener for keyboard to show up
   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
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
      this.props.signup(email, password, () => {
         this.props.login(email, password, () => {
            // clear inputs after signing up
            this.setState({ email: '', password: '', isSpinnershowed: false })
            this.props.navigation.navigate('Dashboard');
         });
      }, (error) => { this.setState({ error, isSpinnershowed: false })}
      );
   }

   render() {
      // dynamically disable button
      let disableStatus;
      this.state.email === '' || this.state.password === '' ? disableStatus = true : disableStatus = false;
      return(
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
         <View style={{ flex: 1, justifyContent: 'center' }}>
            {this.image}
            {/* show loading screen */}
            {
               this.state.isSpinnershowed ?
                  <Modal
                     title="Thanks for signing up!"
                     subtitle="Logging you in"
                     textColor='#1a4b93'
                     spinnerSize='small'
                     bannerBackgroundColor='white'
                     width='80%'
                     centerMargin='10%' />
               : null
            }
            
            <Animated.View style={[styles.container, { marginBottom: this.keyboardHeight } ]}>
            <ViewContainer>
               <Text style={styles.title}>Create a new account</Text>
               
               <Input 
                  placeholder="Email"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email, error: { message: ''} })}
                  keyboardType="email-address"
                  autoFocus
                  returnKeyType="next"
                  inputStyle={{ color: color.inputColor }}
                  reference={input => this.inputs['email'] = input}
                  onSubmitEditing={() => this.inputs['password'].focus()}
               />
               {/* display email-relatederror */}
                  {
                     this.state.error.code === "auth/invalid-email" 
                     || this.state.error.code === "auth/user-not-found"
                     || this.state.error.code === "auth/email-already-in-use"
                     ?
                     <Text style={{ color: 'red' }}>{this.state.error.message}</Text>
                     : null
                  }

               <Input 
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password, error: { message: ''} })}
                  inputStyle={{ color: color.inputColor }}
                  secureTextEntry
                  returnKeyType='done'
                  reference={input => this.inputs['password'] = input}
               />


               {
                  this.state.error.code === "auth/wrong-password" 
                  || this.state.error.code === "auth/weak-password"
                  ?
                  <Text style={{ color: 'red', marginBottom: 10 }}>{this.state.error.message}</Text>
                  : null
               }

               <ButtonAuth 
                  title="Sign up" 
                  onPress={this.handleSubmit}
                  style={styles.button}
                  disabled={disableStatus} />
               <Text style={styles.message}>
                  Already had an account?
               </Text>
               <TouchableWithoutFeedback 
                  style={{flex:1}}
                  onPress={() => this.props.navigation.navigate('Login')} >
                  <View 
                     style={styles.signinContainer} >
                     <Text
                        style={styles.siginText}
                        >Sign in</Text>
                     <Ionicons name="ios-arrow-forward" size={20} color="#2b6edb" />
                  </View>
               </TouchableWithoutFeedback>
               
            </ViewContainer>
            </Animated.View>
         </View>
         </TouchableWithoutFeedback>
      );
   }
}

const color = {
   inputColor: '#6a6b6d',
}

const styles = {
   container: {
      display: 'flex',
      height: DEVICE_HEIGHT /2.3,
      justifyContent: 'space-around',
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      paddingLeft: '5%',
      paddingRight: '5%',
      paddingBottom: 5,
      borderRadius: 5,
   },
   title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 10, 
      paddingBottom: 10,
   },
   button: {
      marginTop: 0,
      marginBottom: 0,
   },
   message: {
      color: color.inputColor,
      textAlign: 'center',
      fontSize: 16,
      paddingTop: 10,
      paddingBottom: 10
   },
   signinContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
   },
   siginText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#2b6edb',
      fontWeight: 'bold',
      marginRight: 5,
   }
}

export default connect(null, actions)(SignupForm);