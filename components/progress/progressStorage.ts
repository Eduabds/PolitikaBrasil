import Storage from 'expo-sqlite/kv-store';
import type { ProgressData } from '@/types/progress';
import { emptyProgress } from '@/types/progress';

const KEY = 'politikabrasil.progress.v1';

export async function loadProgress(): Promise<ProgressData> {
  try {
    const value = await Storage.getItem(KEY);
    return value ? { ...emptyProgress, ...JSON.parse(value) } : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export async function saveProgress(progress: ProgressData) {
  await Storage.setItem(KEY, JSON.stringify(progress));
}
