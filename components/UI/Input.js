import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = (props) => {
   return(
      <View style={[styles.container, props.style]}>
         <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            onSubmitEditing={props.onSubmitEditing}
            returnKeyType={props.returnKeyType}
            // focus={props.focus}
            autoFocus={props.autoFocus}
            style={[styles.input, props.inputStyle]}
            secureTextEntry={props.secureTextEntry}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            onFocus={props.onFocus}
            clearButtonMode="while-editing"
            ref={props.reference}
         />
      </View>
   );
}

const styles = {
   container: {
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   input: {
      fontSize: 18,
      borderBottomColor: '#cacdd1',
      borderTopWidth: 0,
      borderBottomWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      flex: 20,
      maxHeight: 100,
   },
   icon: {
      flex: 1,
   }
}

export default Input;