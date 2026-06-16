import { linguaColors } from "@/theme";
import { useRouter } from "expo-router";
import { Dimensions, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

// Shadow styles can't be expressed as Tailwind class names in React Native
const bubbleShadow = {
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
};

const buttonShadow = {
  shadowColor: linguaColors.purple,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.4,
  shadowRadius: 16,
  elevation: 8,
};

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header — pt-[52px] to clear the status bar */}
      <View className="flex-row items-center justify-center gap-3 px-6 pt-[52px] pb-2">
        <Image
          source={require("@/assets/images/moscot-logo.png")}
          className="w-9 h-9"
          resizeMode="contain"
        />
        <Text className="text-xl font-semibold text-text-primary">lingua</Text>
      </View>

      {/* Heading & Subtitle */}
      <View className="px-6 mt-4">
        <Text className="text-[38px] font-extrabold text-text-primary leading-[46px]">
          Your AI language
        </Text>
        <Text className="text-[38px] font-extrabold text-primary leading-[46px]">
          teacher.
        </Text>
        <Text className="text-[15px] text-text-secondary leading-[22px] mt-2">
          Real conversations, personalized{"\n"}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Mascot + Speech Bubbles */}
      <View className="flex-1 relative mt-2">

        {/* Hello! — left, ~22% from top */}
        <View
          className="absolute left-4 z-10 bg-[#EFEFFE] rounded-[18px] px-[18px] py-[11px]"
          style={{ top: "22%", shadowColor: "#6C4EF5", ...bubbleShadow }}
        >
          <Text className="text-[17px] font-bold text-text-primary">Hello!</Text>
        </View>

        {/* ¡Hola! — right, ~4% from top */}
        <View
          className="absolute right-4 z-10 bg-[#EEF0FF] rounded-[18px] px-[18px] py-[11px]"
          style={{ top: "4%", shadowColor: "#4D8BFF", ...bubbleShadow }}
        >
          <Text className="text-[17px] font-bold text-primary">¡Hola!</Text>
        </View>

        {/* 你好! — right, ~46% from top */}
        <View
          className="absolute right-4 z-10 bg-[#FFF0F0] rounded-[18px] px-[18px] py-[11px]"
          style={{ top: "46%", shadowColor: "#FF4D4F", ...bubbleShadow }}
        >
          <Text className="text-[17px] font-bold text-error">你好!</Text>
        </View>

        {/* Mascot — centered in flex zone */}
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("@/assets/images/mascot-welcome.png")}
            style={{ width: width * 0.65, height: width * 0.65 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Get Started Button */}
      <View className="px-6 pb-10">
        <TouchableOpacity
          onPress={() => router.push("/sign-up")}
          activeOpacity={0.85}
          className="bg-primary rounded-lg py-[18px] flex-row items-center justify-center"
          style={buttonShadow}
        >
          <Text className="text-white text-lg font-bold mr-2">Get Started</Text>
          <Text className="text-white text-[22px] font-light ">›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
