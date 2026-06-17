import { linguaColors } from "@/theme";
import { Href, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  onClose: () => void;
  onVerify?: (code: string) => Promise<boolean> | boolean;
  onResend?: () => void;
  redirectTo?: Href;
};

export function VerificationModal({
  visible,
  onClose,
  onVerify,
  onResend,
  redirectTo = "/",
}: VerificationModalProps) {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = async (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Auto-navigate when all digits are filled
    if (digit && index === CODE_LENGTH - 1) {
      const filled = next.every((d) => d !== "");
      if (filled) {
        const fullCode = next.join("");
        let success = true;

        if (onVerify) {
          success = await Promise.resolve(onVerify(fullCode));
        } else {
          // Mock validation
          if (__DEV__) {
            if (fullCode !== "123456") {
              success = false;
              Alert.alert("Invalid Code", "For testing, please use 123456.");
            }
          } else {
            success = false;
            Alert.alert("Error", "Validation not available in production.");
          }
        }

        if (success) {
          setTimeout(() => {
            onClose(); // Close modal before navigation to prevent state inconsistency
            router.replace(redirectTo);
          }, 300);
        } else {
          setCode(Array(CODE_LENGTH).fill(""));
          inputs.current[0]?.focus();
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleClose = () => {
    setCode(Array(CODE_LENGTH).fill(""));
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View className="flex-1 bg-black/45 justify-end">
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior="padding">
              <View className="bg-white rounded-t-[32px] px-6 pt-8 pb-12">
                {/* Handle */}
                <View className="w-10 h-1 bg-[#E5E7EB] rounded-sm self-center mb-6" />

                <Text className="text-[22px] font-extrabold text-text-primary text-center">
                  Check your email ✉️
                </Text>
                <Text className="text-[14px] text-text-secondary text-center mt-2 mb-8 leading-5">
                  We sent a 6-digit verification code to your email.{"\n"}
                  Enter it below to continue.
                </Text>

                {/* Code input boxes */}
                <View className="flex-row gap-2.5 mb-8">
                  {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                    <TextInput
                      key={i}
                      ref={(el) => { inputs.current[i] = el; }}
                      value={code[i]}
                      onChangeText={(t) => handleChange(t, i)}
                      onKeyPress={(e) => handleKeyPress(e, i)}
                      keyboardType="number-pad"
                      maxLength={1}
                      autoFocus={i === 0}
                      className={`flex-1 aspect-square rounded-xl border-2 text-center text-[22px] font-bold text-text-primary ${
                        code[i] ? "border-primary bg-[#F5F3FF]" : "border-border bg-surface"
                      }`}
                      selectionColor={linguaColors.purple}
                    />
                  ))}
                </View>

                {/* Resend */}
                <Text className="text-[13px] text-text-secondary text-center">
                  Didn't receive it?{" "}
                  <Text
                    className="font-bold text-primary"
                    onPress={() => {
                      if (onResend) {
                        onResend();
                      } else {
                        // TODO: Call backend API to resend code here
                        Alert.alert("Code Sent", "A new verification code has been sent to your email.");
                      }
                      setCode(Array(CODE_LENGTH).fill(""));
                    }}
                  >
                    Resend code
                  </Text>
                </Text>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
