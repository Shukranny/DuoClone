import { useSSO } from "@clerk/expo";
import type { OAuthStrategy } from "@clerk/shared/types";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { Alert, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";

// Maps the `id` field on SOCIAL_PROVIDERS (see src/constants/auth.tsx) to the
// OAuth strategy string Clerk expects.
const PROVIDER_STRATEGY: Record<string, OAuthStrategy> = {
  google: "oauth_google",
  facebook: "oauth_facebook",
  apple: "oauth_apple",
};

// Preloads the browser on Android to reduce auth load time.
// See https://docs.expo.dev/guides/authentication/#improving-user-experience
export function useWarmUpBrowser() {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
}

// Required once per app so the browser-based auth session can complete
// and hand control back to the app.
WebBrowser.maybeCompleteAuthSession();

export function useSocialAuth() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const signInWithProvider = useCallback(
    async (providerId: string) => {
      const strategy = PROVIDER_STRATEGY[providerId];
      if (!strategy) {
        Alert.alert("Not supported", `${providerId} sign-in isn't configured yet.`);
        return;
      }

      try {
        const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
          strategy,
          redirectUrl: AuthSession.makeRedirectUri(),
        });

        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.replace("/");
          return;
        }

        // No session created yet - additional steps (like MFA) may be required.
        // Inspect signIn/signUp status for next steps if you add more strategies.
        if (signIn?.status && signIn.status !== "complete") {
          console.log("Sign-in requires further steps:", signIn.status);
        }
        if (signUp?.status && signUp.status !== "complete") {
          console.log("Sign-up requires further steps:", signUp.status);
        }
      } catch (err: any) {
        console.error("OAuth error:", err);
        Alert.alert("Sign-in failed", err?.errors?.[0]?.message ?? "Please try again.");
      }
    },
    [startSSOFlow, router]
  );

  return { signInWithProvider };
}
