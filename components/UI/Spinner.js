import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = (props) => {
   return(
      <View style={[styles.loadingContainer, props.style]}>
         <ActivityIndicator animating={props.animating} size="large" color="#0000ff" />
      </View>
   )
}

const styles = {
   loadingContainer: {
      flex: 1,
      justifyContent: 'center'
   }
}

export default Spinner;