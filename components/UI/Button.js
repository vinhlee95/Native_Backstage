import React from 'react';
import { View, Button } from 'react-native';

const ReusableButton = (props) => {
   return(
      <View style={buttonStyle}>
         <Button 
            title={props.title}
            color="white"
            onPress={props.onPress}>
         </Button>
      </View>
   );
}

const buttonStyle = {
   borderRadius: 5,
   backgroundColor: '#2b6edb',
   paddingTop: 5,
   paddingBottom: 5,
   marginTop: 10,
   marginBottom: 10,
   shadowColor: '#000',
   shadowOffset: {width: 0, height: 3},
   shadowOpacity: 0.2,
   shadowRadius: 2,
}

export default ReusableButton;