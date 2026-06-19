import { languages, LanguageWithMetadata } from "@/data/languages";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { linguaColors } from "@/theme";
import FontAwesome from "@react-native-vector-icons/fontawesome";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
// 1. Import useSafeAreaInsets hook instead of SafeAreaView wrapper
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const options = {
  headerShown: false,
};

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // 2. Read exact device safe insets
  const { selectedLanguage, setSelectedLanguage } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Filter languages based on search query
  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Show only 4 languages unless "See all" is clicked or user is searching
  const displayedLanguages = useMemo(() => {
    if (searchQuery !== "" || showAll) {
      return filteredLanguages;
    }
    return filteredLanguages.slice(0, 4);
  }, [filteredLanguages, showAll, searchQuery]);

  const handleSelectLanguage = (language: LanguageWithMetadata) => {
    setSelectedLanguage(language);
  };

  const handleConfirm = () => {
    if (selectedLanguage) {
      router.back();
    }
  };

  return (
    // 3. use a normal View to avoid double-padding issues on android instead of SafeAreaView
    <View className="flex-1 bg-white" style={{ paddingBottom: insets.bottom }}>
      
      {/* Header - Dynamically add padding top based on the device's status bar */}
      <View 
        className="flex-row items-center justify-between px-6 pb-3 bg-white"
        style={{ paddingTop: Math.max(insets.top, 16) }} // Fallback to 16px if inset reads 0
      >
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={24} color={linguaColors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-text-primary">Choose a language</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {/* Search Box */}
        <View
          className="flex-row items-center rounded-full px-4 py-3 mb-6"
          style={{ backgroundColor: linguaColors.surface }}
        >
          <FontAwesome name="search" size={18} color={linguaColors.textSecondary} />
          <TextInput
            className="flex-1 ml-3 text-text-primary"
            placeholder="Search languages"
            placeholderTextColor={linguaColors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Popular Section */}
        {searchQuery === "" && (
          <Text className="text-lg font-bold text-text-primary mb-4">Popular</Text>
        )}

        {/* Language Items */}
        <View className="gap-3 pb-6">
          {displayedLanguages.map((language) => {
            const isSelected = selectedLanguage?.code === language.code;
            return (
              <TouchableOpacity
                key={language.code}
                onPress={() => handleSelectLanguage(language)}
                className={`flex-row items-center justify-between px-4 py-4 rounded-2xl border-2 ${
                  isSelected
                    ? "border-purple bg-purple bg-opacity-5"
                    : "border-border bg-surface"
                }`}
                style={
                  isSelected ? { borderColor: linguaColors.purple } : undefined
                }
              >
                <View className="flex-row items-center flex-1">
                  <Text className="text-3xl mr-3">{language.flag}</Text>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-text-primary">
                      {language.name}
                    </Text>
                    <Text className="text-sm text-text-secondary">
                      {language.learners}
                    </Text>
                  </View>
                </View>

                {isSelected ? (
                  <View
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: linguaColors.purple }}
                  >
                    <FontAwesome name="check" size={16} color="white" />
                  </View>
                ) : (
                  <FontAwesome name="chevron-right" size={18} color={linguaColors.textSecondary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* See All Languages Button */}
        {searchQuery === "" && !showAll && filteredLanguages.length > 4 && (
          <TouchableOpacity
            onPress={() => setShowAll(true)}
            className="flex-row items-center justify-center rounded-lg px-4 py-3 "
            style={{ backgroundColor: linguaColors.surface }}
          >
            <FontAwesome name="globe" size={18} color={linguaColors.textSecondary} />
            <Text className="ml-3 text-base font-semibold text-text-primary">See all languages</Text>
          </TouchableOpacity>
        )}

        {/* Earth Image */}
        <View className="items-center  ">
          <Image
            source={require("@/assets/images/earth.png")}
            className="w-full h-64"
            resizeMode="stretch"
          />
        </View>
      </ScrollView>

      {/* Confirmation Button */}
      {selectedLanguage && (
        <View className="px-6 py-4 bg-white border-t border-border">
          <TouchableOpacity
            onPress={handleConfirm}
            className="py-4 rounded-lg items-center justify-center"
            style={{ backgroundColor: linguaColors.purple }}
          >
            <Text className="text-white font-semibold text-base">Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
