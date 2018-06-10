import React, {Component} from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ViewContainer from '../UI/View';
import Button from '../UI/Button';
import Input from '../UI/Input';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class SignupForm extends Component {
   static navigationOptions = {
      header: null,
   }
   state = { email: '', password: ''}

   handleSubmit = () => {
      const { email, password } = this.state;
      this.props.signup(email, password, () => {
         this.props.navigation.navigate('dashboard');
      });
   }

   render() {
      return(
         <View style={{ flex: 1 }}>
         <ViewContainer style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <Input 
               placeholder="Email"
               value={this.state.email}
               onChangeText={email => this.setState({ email })}
               keyboardType="email-address"
               autoFocus
               returnKeyType="next"
            />

            <Input 
               placeholder="Password"
               value={this.state.password}
               onChangeText={password => this.setState({ password })}
               passsword
            />
            
            <Button 
               title="Sign Up" 
               onPress={this.handleSubmit}
               style={styles.button} />
            
         </ViewContainer>
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
         </View>
      );
   }
}

const styles = {
   container: {
      marginTop: 30,
      flex: 0.5,
      justifyContent: 'space-around',
      width: '95%',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      opacity: 0.8,
      paddingLeft: '5%',
      paddingRight: '5%',
      paddingBottom: 20,
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