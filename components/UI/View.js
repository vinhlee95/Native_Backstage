import React from 'react';
import { View } from 'react-native';

const ViewContainer = (props) => {
   return(
      <View style={style}>
         {props.children}
      </View>
   );
}

const style = {
   flex: 1,
   marginLeft: 'auto',
   marginRight: 'auto',
   width: '95%',
}

export default ViewContainer;