import React from 'react';
import { View } from 'react-native';
import {
   FormLabel,
   FormInput,
} from 'react-native-elements';

const Input = (props) => {
   return(
      <View style={styles.container}>
         <FormLabel>{props.label}</FormLabel>
         <FormInput
            value={props.value}
            onChangeText={props.onChangeText}
            password={props.password}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            onSubmitEditing={props.onSubmitEditing}
            returnKeyType={props.returnKeyType}
            focus={props.focus}
            autofocus={props.autofocus}
            containerStyle={{ 
               width: '100%', 
               marginLeft: 'auto', 
               marginRight: 'auto',   
            }}
            inputStyle={{
               color: 'black'
            }}
         />
      </View>
   );
}

const styles = {
   container: {
      margin: 0,
      padding: 0,
   }
}

export default Input;