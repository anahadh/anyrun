import { Host, TextInput } from "@expo/ui";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import LinkElement from "../components/link_element";

export default function RunMaker() {
  const [distance, setDistance] = React.useState<number | null>(null);

  const [distanceText, setDistanceText] = React.useState<string>("");
  const [showDistancePicker, setShowDistancePicker] =
    React.useState<boolean>(false);

  const distancePresets = [1, 2, 3, 5, 10];

  const textInputStyles = {
    borderWidth: 4,
    borderColor: "black",
    padding: 20,
    borderRadius: 5,
    backgroundColor: "gray",
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      {showDistancePicker ? (
        <>
          <Text className="text-3xl text-center font-bold text-red-500 mb-6">
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
              setShowDistancePicker(false);
            }}
            className="bg-red-500 px-8 py-4 rounded-lg mt-6"
          >
            <Text className="text-lg text-center font-bold text-white">Ok</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View className="flex-col items-center gap-5">
            <Text className="text-3xl text-center font-bold text-red-500">
              {distance ? `Selected: ${distance} miles` : "Select a distance"}
            </Text>
            <View className="flex-col items-center gap-5">
              <Text className="text-3xl text-center font-bold text-red-500">
                Distance
              </Text>
              <View className="flex-row flex-wrap w-[80%] items-center gap-3">
                {distancePresets.map((distance) => (
                  <Pressable
                    key={distance}
                    onPress={() => {
                      setDistance(distance);
                    }}
                    className="bg-red-500 w-[30%] px-2 py-8 rounded-lg"
                  >
                    <Text className="text-lg text-center font-bold text-white">
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
                  <Text className="text-lg text-center font-bold text-white">
                    Custom
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="flex-row items-center gap-3 mt-6">
            {distance ? (
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/run_creator",
                    params: { miles: distance },
                  });
                }}
                className="bg-red-500 px-8 py-4 rounded-lg mt-6"
              >
                <Text className="text-lg text-center font-bold text-white">
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
