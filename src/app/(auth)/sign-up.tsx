import { linguaColors } from "@/theme";
import FontAwesome from "@react-native-vector-icons/fontawesome";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useSignUp } from "@clerk/expo";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

import { buttonShadow, cardShadow, SOCIAL_PROVIDERS } from "@/constants/auth";
import { VerificationModal } from "@/components/VerificationModal";
import { useSocialAuth } from "@/hooks/useSocialAuth";

// ─── Sign Up Screen ───────────────────────────────────────────────────────────
export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signUp, errors, fetchStatus } = useSignUp();
  const { signInWithProvider } = useSocialAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const submitting = fetchStatus === "fetching";

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !password.trim()) {
      Alert.alert("Invalid Input", "Please fill out both email and password.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Weak Password", "Password must be at least 8 characters long.");
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    const { error } = await signUp.password({
      emailAddress: email.trim(),
      password,
    });

    if (error) {
      console.error("Sign-up error:", JSON.stringify(error, null, 2));
      Alert.alert(
        "Sign Up Failed",
        error.longMessage || error.message || "Something went wrong. Please try again."
      );
      return;
    }

    try {
      await signUp.verifications.sendEmailCode();
      setShowModal(true);
    } catch (error: any) {
      console.error("Send email verification code error:", error);
      Alert.alert(
        "Verification Code Error",
        error?.longMessage || error?.message || "Failed to send verification email code. Please try again."
      );
    }
  };

  // Called by VerificationModal once all 6 digits are entered.
  const handleVerifyCode = async (code: string) => {
    try {
      await signUp.verifications.verifyEmailCode({ code });

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log("Pending session task:", session.currentTask);
              return;
            }
            router.replace(decorateUrl("/") as Href);
          },
        });
        return true;
      }

      console.error("Sign-up attempt not complete:", signUp);
      Alert.alert("Verification Failed", "That code didn't work. Please try again.");
      return false;
    } catch (error: any) {
      console.error("Verification code verification error:", error);
      Alert.alert(
        "Verification Failed",
        error?.longMessage || error?.message || "Verification code failed or there was a network error. Please try again."
      );
      return false;
    }
  };

  const handleResendCode = async () => {
    try {
      await signUp.verifications.sendEmailCode();
      Alert.alert("Code Sent", "A new verification code has been sent to your email.");
    } catch (err) {
      console.error("Resend error:", JSON.stringify(err, null, 2));
      Alert.alert("Error", "Couldn't resend the code. Please try again.");
    }
  };

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
            Create your account
          </Text>
          <Text className="text-[15px] text-text-secondary mt-1">
            Start your language journey today ✨
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

          {errors?.fields?.emailAddress && (
            <Text className="text-[12px] text-error -mt-1">
              {errors.fields.emailAddress.message}
            </Text>
          )}

          {/* Password */}
          <View
            className="bg-white rounded-2xl border border-border px-4 py-3.5 flex-row items-center"
            style={cardShadow}
          >
            <View className="flex-1">
              <Text className="text-[11px] text-text-secondary font-semibold mb-0.5">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="••••••••"
                placeholderTextColor={linguaColors.textSecondary}
                className="text-[15px] text-text-primary"
                selectionColor={linguaColors.purple}
              />
            </View>
            <TouchableOpacity onPress={() => setShowPassword((p) => !p)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={linguaColors.textSecondary}
              />
            </TouchableOpacity>
          </View>
          {errors?.fields?.password && (
            <Text className="text-[12px] text-error -mt-1">
              {errors.fields.password.message}
            </Text>
          )}

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={submitting}
            activeOpacity={0.85}
            className="bg-primary rounded-2xl py-4 items-center mt-1"
            style={[buttonShadow, submitting && { opacity: 0.6 }]}
          >
            <Text className="text-white text-base font-bold">
              {submitting ? "Creating account..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
          <View nativeID="clerk-captcha" />
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
              onPress={() => signInWithProvider(provider.id)}
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

        {/* Log in link */}
        <Text
          className="text-[13px] text-text-secondary text-center mt-6"
          style={{ marginBottom: Math.max(insets.bottom + 16, 24) }}
        >
          Already have an account?{" "}
          <Text
            className="text-primary font-bold"
            onPress={() => router.replace("/sign-in")}
          >
            Log in
          </Text>
        </Text>
      </KeyboardAvoidingView>
      <VerificationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onVerify={handleVerifyCode}
        onResend={handleResendCode}
        redirectTo="/"
      />
    </View>
  );
}
