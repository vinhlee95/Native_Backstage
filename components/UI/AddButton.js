import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

const AddButton = (props) => {
   const { size, backgroundColor, buttonText } = props;
   let buttonSize = size ? size : 60;
   let background = backgroundColor ? backgroundColor : '#1a4b93';
   let text = buttonText ? buttonText : '+';

   const styles = {
      button: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         width: buttonSize,
         height: buttonSize,
         borderRadius: buttonSize/2,
         backgroundColor: background,
         shadowColor: '#000',
         shadowOffset: {width: 0, height: 5},
         shadowOpacity: 0.2,
         shadowRadius: 2,
      },
      text: {
         color: 'white',
         fontSize: 30,
         marginBottom: 5,
      }

   }
   return(
      <TouchableHighlight 
         onPress={() => props.onPress()} 
         underlayColor="transparent" >
         <View style={[styles.button, props.style]}>
            <Text style={styles.text}>{text}</Text>
         </View>
      </TouchableHighlight>
   );
}



export default AddButton;