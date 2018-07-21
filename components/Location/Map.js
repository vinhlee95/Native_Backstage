import React from 'react';
import { MapView } from 'expo';


export default class Map extends React.Component {
   
   render() {
      const { location } = this.props;
      const initialRegion = {
         latitude: location.lat ? location.lat : 60.192059,
         longitude: location.lng ? location.lng : 24.945831,
         latitudeDelta: location.latDelta ? location.latDelta : 0.02,
         longitudeDelta: location.lngDelta ? location.lngDelta : 0.01,
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