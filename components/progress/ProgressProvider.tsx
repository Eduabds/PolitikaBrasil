import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { loadProgress, saveProgress } from '@/components/progress/progressStorage';
import type { ProgressData } from '@/types/progress';
import { emptyProgress } from '@/types/progress';
import type { LearningModuleId } from '@/types/learning';

type ProgressContextValue = {
  progress: ProgressData;
  ready: boolean;
  completeLesson: (lessonId: string) => void;
  recordQuizResult: (moduleId: LearningModuleId, score: number) => void;
  setDisplayName: (name: string) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadProgress().then((stored) => {
      setProgress(stored);
      setReady(true);
    });
  }, []);

  const update = useCallback((change: (current: ProgressData) => ProgressData) => {
    setProgress((current) => {
      const next = change(current);
      void saveProgress(next);
      return next;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    update((current) => current.completedLessonIds.includes(lessonId)
      ? current
      : { ...current, completedLessonIds: [...current.completedLessonIds, lessonId] });
  }, [update]);

  const recordQuizResult = useCallback((moduleId: LearningModuleId, score: number) => {
    update((current) => ({
      ...current,
      bestQuizScores: {
        ...current.bestQuizScores,
        [moduleId]: Math.max(current.bestQuizScores[moduleId] ?? 0, score),
      },
    }));
  }, [update]);

  const setDisplayName = useCallback((name: string) => {
    update((current) => ({ ...current, displayName: name.trim() || 'Aprendiz' }));
  }, [update]);

  const value = useMemo(() => ({ progress, ready, completeLesson, recordQuizResult, setDisplayName }), [
    progress, ready, completeLesson, recordQuizResult, setDisplayName,
  ]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error('useProgress deve ser usado dentro de ProgressProvider');
  return value;
}
