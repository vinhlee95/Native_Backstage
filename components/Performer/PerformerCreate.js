import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import Header from '../UI/Header';
import Button from '../UI/Button';
import ViewContainer from '../UI/View';
import Spinner from '../UI/Spinner';
import Input from '../UI/Input';

class PerformerCreate extends Component {
   state = { 
         image: null, 
         name: '',
         description: '',
         facebookUrl: '',
         instagramUrl: '',
         isLoading: false
      };

   pickImage = async () => {
      this.setState({ isLoading: true })
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
               image: result.uri,
               isLoading: false
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
                  {/* Profile upload */}
                  {
                     this.state.image
                     ?
                     <Image 
                        source={{ uri: this.state.image }}
                        style={styles.image} />
                     :
                     <TouchableWithoutFeedback onPress={() => this.pickImage()} >
                        <View style={styles.image}>
                           {
                              this.state.isLoading
                              ?
                              <Spinner animating />
                              :
                              <View style={styles.iconContainer}>
                                 <Ionicons name="ios-camera" size={60} />
                                 <Text>Add photo</Text>
                              </View>
                           }
                        </View>
                     </TouchableWithoutFeedback>
                  }

                  <Text style={styles.label}>Name</Text>
                  <Input
                     value={this.state.name}
                     onChangeText={name => this.setState({ name })} />

                  <Text style={styles.label}>Description</Text>
                  <Input
                     value={this.state.description}
                     onChangeText={description => this.setState({ description })}
                     // multiline
                     numberOfLines={2} />

                  <Text style={styles.label}>Facebook URL</Text>
                     <Input
                        value={this.state.facebookUrl}
                        onChangeText={facebookUrl => this.setState({ facebookUrl })} />

                  <Text style={styles.label}>Instagram URL</Text>
                  <Input
                     value={this.state.instagramUrl}
                     onChangeText={instagramUrl => this.setState({ instagramUrl })} />
                  <Button title="Save" onPress={() => this.props.navigation.goBack()}/>  
                  
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
   },
   iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   label: {
      fontSize: 16,
      fontWeight: 'bold'
   }
}

export default PerformerCreate;
