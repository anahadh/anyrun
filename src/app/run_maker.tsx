import { Host, TextInput } from "@expo/ui";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import LinkElement from "../components/link_element";
import AddressForm, { AddressFormHandle } from "../components/address_form";
import { GooglePlaceData } from "../types/routeTypes";

export default function RunMaker() {
  const [distance, setDistance] = React.useState<number | null>(null);
  const [location, setLocation] = React.useState<GooglePlaceData | null>(null);
  const addressFormRef = React.useRef<AddressFormHandle>(null);

  const [distanceText, setDistanceText] = React.useState<string>("");
  const [showDistancePicker, setShowDistancePicker] =
    React.useState<boolean>(false);

  const distancePresets = [1, 2, 3, 5, 10];

  const locationLabel = location
    ? location.formatted_address ?? location.description
    : null;

  const textInputStyles = {
    borderWidth: 4,
    borderColor: "black",
    padding: 20,
    borderRadius: 5,
    backgroundColor: "gray",
  };

  return (
    <View className="items-center justify-center flex-1 bg-white">
      {showDistancePicker ? (
        <>
          <Text className="mb-6 text-3xl font-bold text-center text-red-500">
            Pick amount to run
          </Text>
          <Host matchContents>
            <TextInput
              onChangeText={setDistanceText}
              placeholder="Enter distance in miles"
              style={textInputStyles}
            />
          </Host>
          <Pressable
            onPress={() => {
              setDistance(parseFloat(distanceText));
              setLocation(null);
              addressFormRef.current?.clear();
              setShowDistancePicker(false);
            }}
            className="px-8 py-4 mt-6 bg-red-500 rounded-lg"
          >
            <Text className="text-lg font-bold text-center text-white">Ok</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text className="text-2xl font-bold text-center text-red-500 w-[80%]">
            {locationLabel
              ? `Location: ${locationLabel}`
              : distance
              ? `Distance: ${distance} miles`
              : "Select a location or a distance"}
          </Text>
          <View className="flex-col items-center w-full gap-5 mt-6">
            <Text className="text-3xl font-bold text-center text-red-500">
              Location
            </Text>
            <View style={{ width: '80%', zIndex: 10 }}>
              <AddressForm
                ref={addressFormRef}
                onSelect={(address) => {
                  setLocation(address);
                  setDistance(null);
                }}
              />
            </View>
          </View>
          <View className="flex-col items-center gap-5 mt-6">
            <View className="flex-col items-center gap-5">
              <Text className="text-3xl font-bold text-center text-red-500">
                Distance
              </Text>
              <View className="flex-row flex-wrap w-[80%] items-center gap-3">
                {distancePresets.map((distance) => (
                  <Pressable
                    key={distance}
                    onPress={() => {
                      setDistance(distance);
                      setLocation(null);
                      addressFormRef.current?.clear();
                    }}
                    className="bg-red-500 w-[30%] px-2 py-8 rounded-lg"
                  >
                    <Text className="text-lg font-bold text-center text-white">
                      {distance} miles
                    </Text>
                  </Pressable>
                ))}
                <Pressable
                  key="custom-distance"
                  onPress={() => {
                    setShowDistancePicker(true);
                  }}
                  className="bg-red-500 w-[30%] px-2 py-8 rounded-lg"
                >
                  <Text className="text-lg font-bold text-center text-white">
                    Custom
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="flex-row items-center gap-3 mt-6">
            {distance || location ? (
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/run_creator",
                    params: {
                    miles: distance,
                    location: location ? JSON.stringify(location) : undefined,
                  },
                  });
                }}
                className="px-8 py-4 mt-6 bg-red-500 rounded-lg"
              >
                <Text className="text-lg font-bold text-center text-white">
                  Create Run
                </Text>
              </Pressable>
            ) : null}
            <LinkElement href="/" linkStyles="mt-6">
              Go Back
            </LinkElement>
          </View>
        </>
      )}
    </View>
  );
}
