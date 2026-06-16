import { linguaColors } from "@/theme";
import FontAwesome from "@react-native-vector-icons/fontawesome";

export const buttonShadow = {
  shadowColor: linguaColors.purple,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.35,
  shadowRadius: 16,
  elevation: 8,
};

export const cardShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 4,
  elevation: 2,
};

export type SocialProvider = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export const SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    id: "google",
    label: "Continue with Google",
    icon: <FontAwesome name="google" size={20} color="#EA4335" />,
  },
  {
    id: "facebook",
    label: "Continue with Facebook",
    icon: <FontAwesome name="facebook-square" size={20} color="#1877F2" />,
  },
  {
    id: "apple",
    label: "Continue with Apple",
    icon: <FontAwesome name="apple" size={22} color="#000000" />,
  },
];
