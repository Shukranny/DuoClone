import { Language } from '@/types/learning';
import { create } from 'zustand';

interface LanguageStore {
  selectedLanguage: Language | null;
  setSelectedLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  selectedLanguage: null,
  setSelectedLanguage: (language: Language) => set({ selectedLanguage: language }),
}));
