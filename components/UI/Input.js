import React from 'react';
import { View } from 'react-native';
import {
   FormLabel,
   FormInput,
} from 'react-native-elements';

const Input = (props) => {
   return(
      <View>
         <FormLabel>{props.label}</FormLabel>
         <FormInput
            value={props.value}
            onChangeText={props.onChangeText}
            password={props.password}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
         />
      </View>
   );
}

export default Input;