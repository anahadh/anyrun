import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import LinkElement from "../components/link_element";

export default function RunCreator() {
  const { miles, location } = useLocalSearchParams<{
    miles?: string;
    location?: string;
  }>();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl text-center font-bold text-red-500">
        Your run has been created!{"\n"}
        {miles
          ? `You are running ${miles} miles`
          : `You are running to ${location}`}
      </Text>
      <LinkElement href="/" linkStyles="mt-6">
        Go Home
      </LinkElement>
    </View>
  );
}
