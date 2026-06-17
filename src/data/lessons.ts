import { Lesson, Activity, VocabularyItem, Phrase } from "../types/learning";

// Hard‑coded vocabulary items referenced by lessons
export const vocabularies: Record<string, VocabularyItem> = {
  "en-vocab-1": { term: "Hello", translation: "Hola" },
  "en-vocab-2": { term: "Goodbye", translation: "Adiós" },
  "es-vocab-1": { term: "Hola", translation: "Hello" },
  "es-vocab-2": { term: "Adiós", translation: "Goodbye" },

  "fr-vocab-1": { term: "Bonjour", translation: "Hello" },
  "fr-vocab-2": { term: "Au revoir", translation: "Goodbye" },
  "de-vocab-1": { term: "Hallo", translation: "Hello" },
  "de-vocab-2": { term: "Auf Wiedersehen", translation: "Goodbye" },
  "en-vocab-3": { term: "One", translation: "Uno" },
  "en-vocab-4": { term: "Two", translation: "Dos" },
  "es-vocab-3": { term: "Uno", translation: "One" },
  "es-vocab-4": { term: "Dos", translation: "Two" },
  "fr-vocab-3": { term: "Un", translation: "One" },
  "fr-vocab-4": { term: "Deux", translation: "Two" },
  "de-vocab-3": { term: "Eins", translation: "One" },
  "de-vocab-4": { term: "Zwei", translation: "Two" },
};

// Hard‑coded phrase items referenced by lessons
export const phrases: Record<string, Phrase> = {
  "en-phrase-1": {
    text: "How are you?",
    translation: "¿Cómo estás?",
  },
  "en-phrase-2": {
    text: "Nice to meet you",
    translation: "Mucho gusto",
  },
  "es-phrase-1": {
    text: "¿Cómo estás?",
    translation: "How are you?",
  },
  "es-phrase-2": {
    text: "Mucho gusto",
    translation: "Nice to meet you",
  },
  "fr-phrase-1": { text: "Comment ça va?", translation: "How are you?" },
  "fr-phrase-2": { text: "Enchanté de vous rencontrer", translation: "Nice to meet you" },
  "de-phrase-1": { text: "Wie geht es dir?", translation: "How are you?" },
  "de-phrase-2": { text: "Freut mich, dich kennenzulernen", translation: "Nice to meet you" },
};

export const lessons: Lesson[] = [
  {
    id: "en-lesson-1",
    languageCode: "en",
    unitId: "en-unit-1",
    title: "Greetings",
    goals: ["Introduce basic greetings in English"],
    activities: [
      { type: "vocabulary", contentId: "en-vocab-1" },
      { type: "vocabulary", contentId: "en-vocab-2" },
      { type: "phrase", contentId: "en-phrase-1" },
      { type: "phrase", contentId: "en-phrase-2" },
    ],
    aiPrompt:
      "Create a short video where an AI teacher demonstrates saying 'Hello' and 'Goodbye' in English, including pronunciation tips.",
  },
  {
    id: "es-lesson-1",
    languageCode: "es",
    unitId: "es-unit-1",
    title: "Saludos",
    goals: ["Introduce basic greetings in Spanish"],
    activities: [
      { type: "vocabulary", contentId: "es-vocab-1" },
      { type: "vocabulary", contentId: "es-vocab-2" },
      { type: "phrase", contentId: "es-phrase-1" },
      { type: "phrase", contentId: "es-phrase-2" },
    ],
    aiPrompt:
      "Create a short video where an AI teacher demonstrates saying 'Hola' and 'Adiós' in Spanish, including pronunciation tips.",
  },
  {
    id: "en-lesson-2",
    languageCode: "en",
    unitId: "en-unit-1",
    title: "Numbers",
    goals: ["Learn basic numbers in English"],
    activities: [
      { type: "vocabulary", contentId: "en-vocab-3" },
      { type: "vocabulary", contentId: "en-vocab-4" },
    ],
    aiPrompt: "Create a short video teaching numbers 1-5 in English.",
  },
  {
    id: "es-lesson-2",
    languageCode: "es",
    unitId: "es-unit-1",
    title: "Números",
    goals: ["Learn basic numbers in Spanish"],
    activities: [
      { type: "vocabulary", contentId: "es-vocab-3" },
      { type: "vocabulary", contentId: "es-vocab-4" },
    ],
    aiPrompt: "Create a short video teaching numbers 1-5 in Spanish.",
  },
  {
    id: "fr-lesson-1",
    languageCode: "fr",
    unitId: "fr-unit-1",
    title: "Salutations",
    goals: ["Introduce basic greetings in French"],
    activities: [
      { type: "vocabulary", contentId: "fr-vocab-1" },
      { type: "vocabulary", contentId: "fr-vocab-2" },
      { type: "phrase", contentId: "fr-phrase-1" },
      { type: "phrase", contentId: "fr-phrase-2" },
    ],
    aiPrompt: "Create a short video where an AI teacher demonstrates saying 'Bonjour' and 'Au revoir' in French.",
  },
  {
    id: "fr-lesson-2",
    languageCode: "fr",
    unitId: "fr-unit-1",
    title: "Nombres",
    goals: ["Learn basic numbers in French"],
    activities: [
      { type: "vocabulary", contentId: "fr-vocab-3" },
      { type: "vocabulary", contentId: "fr-vocab-4" },
    ],
    aiPrompt: "Create a short video teaching numbers 1-5 in French.",
  },
  {
    id: "de-lesson-1",
    languageCode: "de",
    unitId: "de-unit-1",
    title: "Begrüßungen",
    goals: ["Introduce basic greetings in German"],
    activities: [
      { type: "vocabulary", contentId: "de-vocab-1" },
      { type: "vocabulary", contentId: "de-vocab-2" },
      { type: "phrase", contentId: "de-phrase-1" },
      { type: "phrase", contentId: "de-phrase-2" },
    ],
    aiPrompt: "Create a short video where an AI teacher demonstrates saying 'Hallo' and 'Auf Wiedersehen' in German.",
  },
  {
    id: "de-lesson-2",
    languageCode: "de",
    unitId: "de-unit-1",
    title: "Zahlen",
    goals: ["Learn basic numbers in German"],
    activities: [
      { type: "vocabulary", contentId: "de-vocab-3" },
      { type: "vocabulary", contentId: "de-vocab-4" },
    ],
    aiPrompt: "Create a short video teaching numbers 1-5 in German.",
  },
];
