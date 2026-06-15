import { linguaColors } from "@/theme";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Screen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600 mb-8">Hello NativeWind!</Text>
      <TouchableOpacity
        onPress={() => router.push("/onboarding")}
        className="px-6 py-3 rounded-lg"
        style={{ backgroundColor: linguaColors.purple }}
      >
        <Text className="text-white font-semibold">Go to Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}
