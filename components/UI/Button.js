import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

const ReusableButton = (props) => {
   return(
      <View>
         <Button 
            title={props.title}
            buttonStyle={[{ backgroundColor: '#2b6edb', borderRadius: 5}, props.buttonStyle]}
            onPress={props.onPress}
         />
      </View>
   );
}

export default ReusableButton;