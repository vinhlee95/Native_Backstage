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
         style={{ flex: 1, height: 300 }}
         initialRegion={initialRegion}
         region={initialRegion} >
            <MapView.Marker coordinate = {initialRegion}/>     
         </MapView>
      );
   }
}