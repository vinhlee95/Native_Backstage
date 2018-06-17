import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

const AddButton = (props) => {
   const { size, backgroundColor } = props;
   let buttonSize = size ? size : 60;
   let background = backgroundColor ? backgroundColor : '#1a4b93';

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
         shadowOpacity: 0.1,
         shadowRadius: 2,
      },
      text: {
         color: 'white',
         fontSize: 30,
         marginBottom: 5,
      }

   }
   return(
      <TouchableHighlight onPress={() => console.log('tapped!')} underlayColor="#86a7d8">
         <View style={[styles.button, props.style]}>
            <Text style={styles.text}>+</Text>
         </View>
      </TouchableHighlight>
   );
}



export default AddButton;