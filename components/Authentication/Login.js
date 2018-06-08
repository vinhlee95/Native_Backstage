import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Input from '../UI/Input';


class LoginForm extends Component {
   static navigationOptions = {
      title: 'Log in'
   }
   state = { email: '', password: ''}

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
               title="Log In" 
               buttonStyle={{ backgroundColor: '#2b6edb', borderRadius: 3}}
               onPress={this.handleSubmit} />
            <Text style={styles.message}>First time here?</Text>
            <Button
               title="Sign Up"
               buttonStyle={{ backgroundColor: '#2b6edb', borderRadius: 3}}
               onPress={() => this.props.navigation.navigate('signup')} />
         </View>
      );
   }
}

const styles = {
   container: {
      width: '100%',
      marginTop: 15,
   },
   message: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
      color: '#e56354',
   }
}

export default LoginForm;