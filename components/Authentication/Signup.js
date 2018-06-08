import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';


class SignupForm extends Component {
   static navigationOptions = {
      title: 'Sign up'
   }
   state = { email: '', password: ''}

   render() {
      return(
         <View style={styles.container}>
            <View>
               <FormLabel>Email</FormLabel>
               <FormInput 
                  value={this.state.email}
                  placeholder="test@test.com"
                  onChangeText={email => this.setState({ email })}
                  keyboardType="email-address" />
            </View>
            <View style={{ marginBottom: 10}}>
               <FormLabel>Password</FormLabel>
               <FormInput
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  password={true} />
            </View>
            <Button 
               title="Sign Up" 
               buttonStyle={{ backgroundColor: '#2b6edb', borderRadius: 3}}
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

export default SignupForm;