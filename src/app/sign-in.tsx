import { linguaColors } from "@/theme";
import FontAwesome from "@react-native-vector-icons/fontawesome";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CODE_LENGTH = 6;

import { buttonShadow, cardShadow, SOCIAL_PROVIDERS } from "@/constants/auth";
import { VerificationModal } from "@/components/VerificationModal";

// ─── Sign In Screen ───────────────────────────────────────────────────────────
export default function SignInScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-14 ml-4 w-10 h-10 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={26} color={linguaColors.textPrimary} />
        </TouchableOpacity>

        {/* Heading */}
        <View className="px-6 mt-2">
          <Text className="text-[28px] font-extrabold text-text-primary">
            Welcome back!
          </Text>
          <Text className="text-[15px] text-text-secondary mt-1">
            Continue your language journey 🌟
          </Text>
        </View>

        {/* Mascot */}
        <View className="items-center mt-4 mb-2">
          <Image
            source={require("@/assets/images/mascot-auth.png")}
            style={{ width: width * 0.36, height: width * 0.36 }}
            resizeMode="contain"
          />
        </View>

        {/* Form */}
        <View className="px-6 gap-3">
          {/* Email */}
          <View
            className="bg-white rounded-2xl border border-border px-4 py-3.5"
            style={cardShadow}
          >
            <Text className="text-[11px] text-text-secondary font-semibold mb-0.5">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              placeholderTextColor={linguaColors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              className="text-[15px] text-text-primary"
              selectionColor={linguaColors.purple}
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={() => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!email.trim()) {
                Alert.alert("Invalid Email", "Please enter your email address.");
                return;
              }
              if (!emailRegex.test(email)) {
                Alert.alert("Invalid Email", "Please enter a valid email address.");
                return;
              }
              setShowModal(true);
            }}
            activeOpacity={0.85}
            className="bg-primary rounded-2xl py-4 items-center mt-1"
            style={buttonShadow}
          >
            <Text className="text-white text-base font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* OR divider */}
        <View className="flex-row items-center px-6 mt-6 mb-4">
          <View className="flex-1 h-[1px] bg-border" />
          <Text className="text-[13px] text-text-secondary mx-3">
            or continue with
          </Text>
          <View className="flex-1 h-[1px] bg-border" />
        </View>

        {/* Social buttons */}
        <View className="px-6 gap-2.5">
          {SOCIAL_PROVIDERS.map((provider) => (
            <TouchableOpacity
              key={provider.id}
              activeOpacity={0.8}
              onPress={() => {
                // TODO: Initiate appropriate auth flow based on provider.id
                Alert.alert("Social Sign In", `Initiating ${provider.label}...`);
              }}
              className="flex-row items-center bg-white border border-border rounded-2xl px-5 py-3.5"
              style={cardShadow}
            >
              <View className="w-7 items-center">{provider.icon}</View>
              <Text className="text-[15px] font-medium text-text-primary ml-3.5">
                {provider.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign up link */}
        <Text
          className="text-[13px] text-text-secondary text-center mt-6"
          style={{ marginBottom: Math.max(insets.bottom + 16, 24) }}
        >
          Don't have an account?{" "}
          <Text
            className="text-primary font-bold"
            onPress={() => router.replace("/sign-up")}
          >
            Sign up
          </Text>
        </Text>
      </KeyboardAvoidingView>
      <VerificationModal visible={showModal} onClose={() => setShowModal(false)} redirectTo="/home" />
    </View>
  );
}
