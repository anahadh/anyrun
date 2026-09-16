import React from 'react';
import { GooglePlaceData } from '../types/routeTypes';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete'

type AddressFormProps = {
  onSelect?: (place: GooglePlaceData) => void;
};

export type AddressFormHandle = {
  clear: () => void;
};

const AddressForm = React.forwardRef<AddressFormHandle, AddressFormProps>(
  ({ onSelect }, ref) => {
    const autocompleteRef = React.useRef<GooglePlacesAutocompleteRef>(null);

    React.useImperativeHandle(ref, () => ({
      clear: () => {
        autocompleteRef.current?.setAddressText('');
      },
    }));

    return (
    <GooglePlacesAutocomplete
        ref={autocompleteRef}
        placeholder="Enter your address"
        fetchDetails
        onPress={(data, details = null) => {
            onSelect?.({ ...data, formatted_address: details?.formatted_address });
            autocompleteRef.current?.setAddressText('');
        }}
        query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
            language: 'en',
        }}
        styles={{
            container: { flex: 0, width: '100%', alignSelf: 'stretch' },
            textInputContainer: {
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 8,
                paddingHorizontal: 4,
            },
            textInput: {
                width: '100%',
                height: 44,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#d1d1d6',
                borderRadius: 8,
                paddingHorizontal: 12,
                color: '#111',
            },
            listView: {
                backgroundColor: '#fff',
                borderRadius: 8,
                marginTop: 4,
            },
            row: {
                paddingVertical: 12,
                paddingHorizontal: 12,
            },
            separator: {
                height: 1,
                backgroundColor: '#eee',
            },
            description: {
                fontSize: 15,
            },
        }}
    />
    );
  }
);

export default AddressForm;
