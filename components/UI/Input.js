import React from 'react';
import { View, TextInput } from 'react-native';

const Input = (props) => {
   return(
      <View style={styles.container}>
         <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            password={props.password}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            onSubmitEditing={props.onSubmitEditing}
            returnKeyType={props.returnKeyType}
            focus={props.focus}
            autofocus={props.autofocus}
            style={styles.input}
         />
      </View>
   );
}

const styles = {
   container: {
      marginBottom: 15,
   },
   input: {
      fontSize: 18,
      borderBottomColor: '#cacdd1',
      borderTopWidth: 0,
      borderBottomWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
   }
}

export default Input;