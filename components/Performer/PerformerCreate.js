import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import Header from '../UI/Header';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';

class PerformerCreate extends Component {
   state = { image: null };

   pickImage = async () => {
      const permissions = Permissions.CAMERA_ROLL;
      const { status } = await Permissions.askAsync(permissions);

      if(status === 'granted') {
         let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
         });

         console.log(result);

         if (!result.cancelled) {
            this.setState({
               image: result.uri
            });
         }
      }

      
   }

   render() {
      return (
         <View>
            <Header
               headerName="New performer"
               notShowIcon headerRightTitle = "Done"
               navigateBack={() => this.props.navigation.goBack()} />
            <ScrollView>
               <ViewContainer>
                  {
                     this.state.image
                     ?
                     <Image 
                        source={{ uri: this.state.image }}
                        style={styles.image} />
                     :
                     <TouchableWithoutFeedback onPress={() => this.pickImage()} >
                        <View style={styles.image}>
                           <Ionicons name="ios-camera" size={60} />
                        </View>
                     </TouchableWithoutFeedback>
                  }
                  
               </ViewContainer>
            </ScrollView>
         </View>
      )
   }
}

const styles = {
   image: {
      backgroundColor: 'lightgrey',
      width: 200,
      height: 200,
      borderRadius: 100,
      marginTop: 15, marginBottom: 15,
      marginLeft: 'auto', marginRight: 'auto',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
}

export default PerformerCreate;
