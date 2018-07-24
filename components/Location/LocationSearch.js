import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class LocationSearch extends Component {
  state = { locationName: '' }
  
  render() {
    let defaultValue;
    this.props.defaultValue ? defaultValue = this.props.defaultValue : defaultValue = '';
    return (
      <GooglePlacesAutocomplete
         value={this.props.value}
         placeholder={this.props.placeholder}
         minLength={2} // minimum length of text to search
         autoFocus={false}
         returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
         listViewDisplayed='auto'    // true/false/undefined
         fetchDetails={true}
         renderDescription={row => row.description} // custom description render
         onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            const { lat, lng } = details.geometry.location;
            this.props.handleSelectLocation(lat, lng);
            this.props.submitLocationDescription(data.description);
         }}
        
        getDefaultValue={() => defaultValue}
        
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyBLrW_oMKlUduQ8o-isIZVgsmcXTi67D9k',
          language: 'en', // language of the results
        }}
        
        styles={{
          textInputContainer: [this.props.containerStyle, {
              backgroundColor: 'transparent',
              borderBottomColor: '#cacdd1',
              borderTopWidth: 0,
              borderBottomWidth: this.props.noBorder ? 0 :1,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 10,
              paddingLeft: 10,
          }],
          textInput: [this.props.inputStyle, {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: 'black',
              fontSize: 16,
              backgroundColor: 'transparent',
              paddingLeft: 0,
              textAlign: this.props.textAlign ? this.props.textAlign : 'none'
          }],
          predefinedPlacesDescription: {
              color: '#1faadb'
          },
        }}
        
        // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        // currentLocationLabel="Current location"

        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  }
}

export default LocationSearch;