import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function AddressForm() {
  return (
    <GooglePlacesAutocomplete
        placeholder="Enter your address"
        onPress={(data, details = null) => {
            
        }}
  );
}
