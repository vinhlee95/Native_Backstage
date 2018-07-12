import React from 'react';
import { View } from 'react-native';

const ViewContainer = (props) => {
   return(
      <View style={[style, props.style]}>
         {props.children}
      </View>
   );
}

const style = {
   flex: 1,
   paddingLeft: '2.5%', paddingRight: '2.5%'
}

export default ViewContainer;