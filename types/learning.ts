export type LearningModuleId =
  | 'three-powers'
  | 'electoral-system'
  | 'elected-offices'
  | 'legislative-process'
  | 'civic-participation';

export type SourceReference = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  locator?: string;
  verifiedAt: string;
};

export type LessonHighlight = {
  title: string;
  body: string;
};

export type LessonSection = {
  id: string;
  heading: string;
  body: string;
  highlight?: LessonHighlight;
  references: SourceReference[];
};

export type LearningLesson = {
  id: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  sections: LessonSection[];
};

export type LearningModule = {
  id: LearningModuleId;
  title: string;
  description: string;
  lessons: LearningLesson[];
};

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  moduleId: LearningModuleId;
  scenario: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  references: SourceReference[];
};
