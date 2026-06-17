import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

/**
 * Clerk's browser-based OAuth flow (useSSO/startSSOFlow) redirects back to
 * this route by default while the in-app browser session completes.
 * No logic is needed here -- AuthGate in the root layout reacts to the
 * resulting auth state change and routes the user to the right screen.
 */
export default function SSOCallback() {
  useEffect(() => {}, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#6C4EF5" />
    </View>
  );
}
