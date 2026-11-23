import type { LearningModuleId } from '@/types/learning';

export type ProgressData = {
  completedLessonIds: string[];
  bestQuizScores: Partial<Record<LearningModuleId, number>>;
  displayName: string;
  hasCompletedOnboarding: boolean;
};

export const emptyProgress: ProgressData = {
  completedLessonIds: [],
  bestQuizScores: {},
  displayName: 'Aprendiz',
  hasCompletedOnboarding: false,
};
