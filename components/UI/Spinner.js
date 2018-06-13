import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = (props) => {
   return(
      <View style={[styles.loadingContainer, props.style]}>
         <ActivityIndicator 
            animating={props.animating} 
            size={props.size ? props.size : 'large'}
            color={props.color ? props.color : '#1a4b93'} />
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