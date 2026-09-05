import { Href, Link } from "expo-router";
import { Pressable, Text } from "react-native";

export default function LinkElement({
  href,
  linkStyles,
  children,
}: {
  href: Href;
  linkStyles?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} asChild>
      <Pressable
        className={`bg-red-500 text-white px-8 py-4 rounded-lg ${linkStyles || ""}`}
      >
        <Text className="text-white font-bold text-lg">{children}</Text>
      </Pressable>
    </Link>
  );
}
