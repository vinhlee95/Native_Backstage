import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Button from '../UI/Button';
import Input from '../UI/Input';


class SignupForm extends Component {
   static navigationOptions = {
      title: 'Sign up'
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
         <View style={styles.container}>
            <View>
               <Input 
                  label="Email"
                  value={this.state.email}
                  placeholder="test@test.com"
                  onChangeText={email => this.setState({ email })}
                  keyboardType="email-address" />
            </View>
            <View style={{ marginBottom: 10}}>
               <Input
                  label="Password"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  password={true} />
            </View>
            <Button 
               title="Sign Up" 
               onPress={this.handleSubmit} />
         </View>
      );
   }
}

const styles = {
   container: {
      width: '100%',
      marginTop: 15,
   },
}

export default connect(null, actions)(SignupForm);