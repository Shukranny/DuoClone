import { linguaColors } from "@/theme";
import { useAuth, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Screen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold text-blue-600 mb-2">Hello NativeWind!</Text>
      <Text className="text-[15px] text-text-secondary mb-8">
        Signed in as {user?.primaryEmailAddress?.emailAddress ?? "..."}
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/languages")}
        className="px-6 py-3 rounded-lg mb-4"
        style={{ backgroundColor: linguaColors.blue }}
      >
        <Text className="text-white font-semibold">Choose Language</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => signOut()}
        className="px-6 py-3 rounded-lg"
        style={{ backgroundColor: linguaColors.purple }}
      >
        <Text className="text-white font-semibold">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
