import React, {Component} from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ViewContainer from '../UI/View';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Spinner from '../UI/Spinner';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class SignupForm extends Component {
   
   state = { email: '', password: '', isSpinnershowed: false, error: ''}

   handleSubmit = () => {
      this.setState({ isSpinnershowed: true })      
      const { email, password } = this.state;
      this.props.signup(email, password, () => {
          this.props.login(email, password, () => {
             this.props.navigation.navigate('Dashboard');
          });
      }, (error) => { this.setState({ error, isSpinnershowed: false })}
      );
   }

   render() {
      return(
         <View style={{ flex: 1 }}>
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
            <ViewContainer style={styles.container}>
               <Text style={styles.title}>Sign Up</Text>
               <Input 
                  placeholder="Email"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email, error: { message: ''} })}
                  keyboardType="email-address"
                  autoFocus
                  returnKeyType="next"
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
                  onChangeText={password => this.setState({ password, error: { message: ''} })}
                  passsword
               />


               {
                  this.state.error.code === "auth/wrong-password" 
                  || this.state.error.code === "auth/weak-password"
                  ?
                  <Text style={{ color: 'red', marginBottom: 10 }}>{this.state.error.message}</Text>
                  : null
               }

               {
                  this.state.isSpinnershowed ?
                     <View style={{ marginTop: 10, marginBottom: 20 }}>
                           <Spinner />
                     </View>
                  : null
               }
               
               <Button 
                  title="Sign Up" 
                  onPress={this.handleSubmit}
                  style={styles.button} />
               
            </ViewContainer>
         </View>
      );
   }
}

const styles = {
   container: {
      marginTop: 30,
      flex: 0.4,
      justifyContent: 'space-around',
      width: '95%',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      opacity: 0.8,
      paddingLeft: '5%',
      paddingRight: '5%',
      paddingBottom: 15,
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
}

export default connect(null, actions)(SignupForm);