import { Language } from "../types/learning";

export interface LanguageWithMetadata extends Language {
  /** Flag emoji for the language */
  flag: string;
  /** Number of learners (formatted string) */
  learners: string;
}

export const languages: LanguageWithMetadata[] = [
  { code: "es", name: "Spanish", flag: "🇪🇸", learners: "28.4M learners" },
  { code: "fr", name: "French", flag: "🇫🇷", learners: "19.4M learners" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", learners: "12.7M learners" },
  { code: "ko", name: "Korean", flag: "🇰🇷", learners: "9.3M learners" },
  { code: "de", name: "German", flag: "🇩🇪", learners: "8.1M learners" },
  { code: "zh", name: "Chinese", flag: "🇨🇳", learners: "7.4M learners" },
  { code: "en", name: "English", flag: "🇬🇧", learners: "Baseline" },
];
