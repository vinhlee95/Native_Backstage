import React from 'react';
import { View, Button } from 'react-native';

const ReusableButton = (props) => {
   return(
      <View>
         <Button 
            title={props.title}
            style={[{ backgroundColor: '#2b6edb', borderRadius: 5}, props.style]}
            onPress={props.onPress}>
         </Button>
      </View>
   );
}

export default ReusableButton;