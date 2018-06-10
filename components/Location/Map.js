import React from 'react';
import { MapView } from 'expo';

export default class Map extends React.Component {
   
   
   render() {
      const { lat, lng } = this.props.location;
      const initialRegion = {
         latitude: lat ? lat : 60.192059,
         longitude: lng ? lng : 24.945831,
         latitudeDelta: 0.02,
         longitudeDelta: 0.01,
      }
      return (
         <MapView
            onPress={this.props.onPress}
            scrollEnabled={this.props.scrollEnabled}
            style={[{ flex: 1 }, this.props.style]}
            initialRegion={initialRegion}
            region={initialRegion} >
            <MapView.Marker coordinate = {initialRegion}/>     
         </MapView>
      );
   }
}