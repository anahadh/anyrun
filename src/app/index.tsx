import { Text, View } from "react-native";

import LinkElement from "../components/link_element";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl text-center font-bold text-red-500">
        Click the button below to{"\n"}create your run!
      </Text>
      <LinkElement href="/run_maker" linkStyles="mt-6">
        Create Run
      </LinkElement>
    </View>
  );
}
