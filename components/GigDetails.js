import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import { HeaderTitle } from './UI/Header/index.js';
import ListItem from './UI/ListItem.js';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons';
import Map from './Location/Map.js';

const location = {
   lat: 60.192059,
   lng: 24.945831,
   latDelta: 0.009,
   lngDelta: 0.01
}

class GigDetails extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: <HeaderTitle headerTitle="Gig Details" />,
         headerStyle: {
            backgroundColor: '#1a4b93',
         },
         headerTintColor: 'white',
      }
   }

   constructor(props) {
      super(props);
      // retrieve data from gig details
      const {
         gigDate, gigTime, gigAddress, product, customerName, customerEmail
      } = this.props.navigation.state.params.gigDetails;
      this.state = {
         gigDate, gigTime, gigAddress, product, customerName, customerEmail
      }
   }


   render() {
      console.log(this.state.product)
      const { productImage, title } = this.state.product;
      const { navigation } = this.props;
      return (
         <ScrollView>
            <ListItem
               icon='ios-calendar-outline'
               title='Date'
               rightTitle={this.state.gigDate}
               noArrow
               rightContentStyle={styles.rightContentStyle}
            />
            <ListItem
               icon='ios-clock-outline'
               title='Time'
               rightTitle={this.state.gigTime}
               noArrow
               rightContentStyle={styles.rightContentStyle}               
            />

            <TouchableOpacity
               onPress={() => navigation.navigate('MapFullScreen', { location })}
            >
               <View style={styles.listItem}>
                  <Ionicons name='ios-navigate-outline' size={25} />
                  <View style={styles.content}>
                     <View style={styles.leftCol}>
                        <View style={styles.titleContainer}>
                           <Text style={styles.title}>Location</Text>
                           <Text style={styles.text}>{this.state.gigAddress}</Text>
                        </View>
                     </View>
                     <View style={styles.rightCol}>
                        <Map
                           style={{ width: 100, height: 100, borderRadius: 5 }}
                           location={location}
                           
                        />
                        <Ionicons name='ios-arrow-forward' size={25}
                           color='#e0e2e5'
                           style={{marginLeft: 5}} />
                     </View>
                  </View>
               </View>
            </TouchableOpacity>

            <TouchableOpacity
               onPress={() => navigation.navigate('PerformanceInfo', {
                  performanceData: this.state.product
               })}
            >
               <View style={styles.listItem}>
                  <Ionicons name='ios-film-outline' size={25} />
                  <View style={styles.content}>
                     <View style={styles.leftCol}>
                        <View style={styles.titleContainer}>
                           <Text style={styles.title}>Performance</Text>
                           <Text style={styles.text}>{title}</Text>
                        </View>
                     </View>
                     <View style={styles.rightCol}>
                        <Image
                           source={{ uri: productImage }}
                           style={{ width: 100, height: 100, borderRadius: 5 }}
                        />
                        <Ionicons name='ios-arrow-forward' size={25}
                           color='#e0e2e5'
                           style={{marginLeft: 5}} />
                     </View>
                  </View>
               </View>
            </TouchableOpacity>

            <ListItem
               icon='ios-person-outline'
               title='Customer Name'
               rightTitle={this.state.customerName}
               rightContentStyle={styles.rightContentStyle}
               noArrow
            />
            <ListItem
               icon='ios-mail-outline'
               title='Customer Email'
               rightTitle={this.state.customerEmail}
               rightContentStyle={styles.rightContentStyle}
            />
         </ScrollView>
      )
   }
}

const styles = {
   listItem: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingLeft: 10, paddingTop: 10,
   },
   content: {
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#e0e2e5',
      paddingBottom: 10, paddingRight: 5,
   },
   leftCol: {
      flexDirection: 'row', flex: 2,
   },
   titleContainer: {
      width: '80%', marginLeft: 10
   },
   title: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
   },
   text: { fontSize: 16 },
   rightCol: {
      flexDirection: 'row', flex: 1,
      alignItems: 'center',

   },
   rightContentStyle: {
      flex: 1,
   }

}

export default GigDetails;