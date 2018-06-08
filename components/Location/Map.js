import React from 'react';
import { MapView } from 'expo';

export default class Map extends React.Component {
   render() {
      const initialRegion = {
         latitude: 60.21901961970849,
         longitude: 24.7768056197085,
         latitudeDelta: 0.09,
         longitudeDelta: 0.04,
      }
      return (
         <MapView
         style={{ flex: 1, height: 300 }}
         initialRegion={initialRegion} >
            <MapView.Marker coordinate = {initialRegion}/>     
         </MapView>
      );
   }
}