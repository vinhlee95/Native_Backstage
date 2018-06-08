import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class LoginForm extends Component {
   static navigationOptions = {
      title: 'Log in'
   }
   state = { email: '', password: ''}

   handleSubmit = () => {
      const { email, password } = this.state;
      this.props.login(email, password, () => {
         this.props.navigation.navigate('Dashboard');
      });
   }

   render() {
      return(
         <ViewContainer>
            <View>
               <Input 
                  label="Email"
                  value={this.state.email}
                  placeholder="Email"
                  onChangeText={email => this.setState({ email })}
                  keyboardType="email-address"
                  style={{ marginTop: 10 }} />
            </View>
            <View style={{ marginBottom: 10}}>
               <Input
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  password={true} />
            </View>
            <Button 
               title="Log In" 
               onPress={this.handleSubmit} />
            <Text style={styles.message}>First time here?</Text>
            <Button
               title="Sign Up"
               onPress={() => this.props.navigation.navigate('signup')} />
         </ViewContainer>
      );
   }
}

const styles = {
   message: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
      color: '#e56354',
   }
}

export default connect(null, actions)(LoginForm);