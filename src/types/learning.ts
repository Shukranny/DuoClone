export interface Language {
  /** ISO 639-1 language code, e.g. 'en' */
  code: string;
  /** Human readable name */
  name: string;
}

export interface VocabularyItem {
  /** Word or short phrase in the target language */
  term: string;
  /** Translation in the learner's native language */
  translation: string;
}

export interface Phrase {
  /** Full sentence in the target language */
  text: string;
  /** Translation in the learner's native language */
  translation: string;
}

/** Optional quiz question used for quiz activities */
export interface QuizQuestion {
  /** Unique id for the question */
  id: string;
  /** Question text in the target language */
  question: string;
  /** Answer options */
  options: string[];
  /** Correct answer (must match one of the options) */
  answer: string;
}

export type ActivityType = 'vocabulary' | 'phrase' | 'quiz';

/** Base activity fields */
export interface BaseActivity {
  /** The kind of activity */
  type: ActivityType;
  /** Identifier of the content referenced in the activity (e.g., vocab id, phrase id, or quiz id) */
  contentId: string;
}

/** Specific activity shapes (use discriminated union) */
export interface VocabularyActivity extends BaseActivity {
  type: 'vocabulary';
}
export interface PhraseActivity extends BaseActivity {
  type: 'phrase';
}
export interface QuizActivity extends BaseActivity {
  type: 'quiz';
}

export type Activity = VocabularyActivity | PhraseActivity | QuizActivity;

export interface Lesson {
  /** Unique identifier */
  id: string;
  /** Language code this lesson belongs to */
  languageCode: string;
  /** Unit id this lesson is part of */
  unitId: string;
  /** Title shown to the learner */
  title: string;
  /** High‑level learning goals */
  goals: string[];
  /** Ordered list of activities */
  activities: Activity[];
  /** Prompt that will be sent to the AI Vision Teacher for future audio‑video lessons */
  aiPrompt?: string;
  /** Optional media URLs for lesson resources */
  videoUrl?: string;
  audioUrl?: string;
}

export interface Unit {
  /** Unique identifier */
  id: string;
  /** Language code */
  languageCode: string;
  /** Title displayed in the UI */
  title: string;
  /** Lesson ids that belong to this unit */
  lessonIds: string[];
}
