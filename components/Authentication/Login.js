import React, {Component} from 'react';
import { View, Text, TextInput, Image, Dimensions } from 'react-native';
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
   static navigationOptions = {
      header: null,
   }
   state = { email: '', password: '', isSpinnershowed: false }

   handleSubmit = () => {
      this.setState({ isSpinnershowed: true })
      const { email, password } = this.state;
      this.props.login(email, password, () => {
         this.props.navigation.navigate('Dashboard');
      });
   }

   render() {
      return(
         <View style={{ flex: 1 }}>
         <ViewContainer style={styles.container}>
            <Text style={styles.title}>Sign into Gigle</Text>
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
            
            {
               this.state.isSpinnershowed ?
               <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Spinner />
               </View>
               : null
            }
            <Button 
               title="Log In" 
               onPress={this.handleSubmit}
               style={styles.button} />
            <Text style={styles.message}>
               ------------or-----------
            </Text>
            <Text
               onPress={() => this.props.navigation.navigate('signup')}
               style={styles.signup}
            >Create an account</Text>
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
   message: {
      color: 'gray',
      textAlign: 'center',
      fontSize: 16,
      paddingTop: 5,
      paddingBottom: 5
   },
   signup: {
      textAlign: 'center',
      fontSize: 18,
      textDecorationLine: 'underline',
      color: '#d8d4d4'
   }
}

export default connect(null, actions)(LoginForm);