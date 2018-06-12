import React, {Component} from 'react';
import { View, Text, TextInput, Image, Dimensions, Animated, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '../UI/Input';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Spinner from '../UI/Spinner';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


class LoginForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '', password: '', isSpinnershowed: false, error: '',
      };
      this.keyboardHeight = new Animated.Value(0);
   }

   // add event listener for keyboard to show up
   componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
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
         this.setState({ email: '', password: '', isSpinnershowed: false })
         this.props.navigation.navigate('Dashboard');
      },
      (error) => {
         this.setState({ error, isSpinnershowed: false })
      }
   );
   }

   render() {
      // dynamically disable button
      let disableStatus;
      this.state.email === '' || this.state.password === '' ? disableStatus = true : disableStatus = false;
      return(
         <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image 
               source={require('../../images/background.jpg')} 
               style={{ 
                  width: DEVICE_WIDTH, 
                  height: DEVICE_HEIGHT,
                  position: 'absolute',
                  zIndex: 0,
                  alignSelf: 'stretch',
                  opacity: 0.8 }}
            />
            <Animated.View style={[styles.container, { marginBottom: this.keyboardHeight } ]}>
            <ViewContainer>
                  <Text style={styles.title}>Sign into Gigle</Text>
                  <Input 
                     placeholder="Email"
                     value={this.state.email}
                     onChangeText={email => this.setState({ email, error: {} })}
                     keyboardType="email-address"
                     autoFocus={true}
                     returnKeyType="next"
                     inputStyle={{ color: color.inputColor }}
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
                     passsword
                     inputStyle={{ color: color.inputColor }}
                  />
                  
                  {
                     this.state.error.code === "auth/wrong-password" 
                     // || this.state.error.code === "auth/user-not-found"
                     ?
                     <Text style={{ color: 'red', marginBottom: 10 }}>{this.state.error.message}</Text>
                     : null
                  }
                  
                  {
                     this.state.isSpinnershowed  ?
                     <View style={{ marginTop: 10, marginBottom: 20 }}>
                           <Spinner />
                     </View>
                     : null
                  }
                  <Button 
                     title="Log In" 
                     onPress={this.handleSubmit}
                     style={styles.button}
                     disabled={disableStatus} />

                  <Text style={styles.message}>
                  ------------or-----------
                  </Text>
                  <Text
                     onPress={() => this.props.navigation.navigate('signup')}
                     style={styles.signup}
                     >Create an account</Text>
            </ViewContainer>
            </Animated.View>
         </View>
      );
   }
}

const color = {
   inputColor: '#6a6b6d',
}

const styles = {
   container: {
      display: 'flex',
      height: DEVICE_HEIGHT / 2.2,
      justifyContent: 'space-around',
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      opacity: 0.8,
      paddingLeft: '5%',
      paddingRight: '5%',
      paddingTop: 20,
      paddingBottom: 10,
      borderRadius: 5,
   },
   title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
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
   signup: {
      textAlign: 'center',
      fontSize: 18,
      textDecorationLine: 'underline',
      color: color.inputColor
   }
}

export default connect(null, actions)(LoginForm);