import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationSearch = (props) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={props.placeholder}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      
      getDefaultValue={() => ''}
      
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBLrW_oMKlUduQ8o-isIZVgsmcXTi67D9k',
        language: 'en', // language of the results
      }}
      
      styles={{
        textInputContainer: {
            backgroundColor: 'transparent',
            borderBottomColor: '#cacdd1',
            borderTopWidth: 0,
            borderBottomWidth: 1,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 10,
         },
         textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 18,
            backgroundColor: 'transparent',
            paddingLeft: 0,
         },
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

export default LocationSearch;