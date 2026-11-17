import type { ProgressData } from '@/types/progress';
import { emptyProgress } from '@/types/progress';

const KEY = 'politikabrasil.progress.v1';

export async function loadProgress(): Promise<ProgressData> {
  try {
    const value = globalThis.localStorage?.getItem(KEY);
    return value ? { ...emptyProgress, ...JSON.parse(value) } : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export async function saveProgress(progress: ProgressData) {
  globalThis.localStorage?.setItem(KEY, JSON.stringify(progress));
}
