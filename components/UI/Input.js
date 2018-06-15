import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = (props) => {
   let icon;
   if(props.value==='') { icon = null }
   if(props.value.length>0) {
      icon = <Icon name="times-circle" size={15} style={styles.icon} color="#afb1b5" onPress={() => props.handleClearInput()} />;
   }
   return(
      <View style={[styles.container, props.style]}>
         <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            onSubmitEditing={props.onSubmitEditing}
            returnKeyType={props.returnKeyType}
            focus={props.focus}
            autofocus={props.autofocus}
            style={[styles.input, props.inputStyle]}
            secureTextEntry={props.secureTextEntry}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
         />
         {icon}
      </View>
   );
}

const styles = {
   container: {
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
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