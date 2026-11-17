import { StyleSheet, Text, View } from 'react-native';

import { learningModules } from '@/constants/learningContent';
import { questionsForModule } from '@/constants/quizContent';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { ProgressData } from '@/types/progress';

export function ModuleBreakdownCard({ progress }: { progress: ProgressData }) {
  const colors = Colors[useColorScheme()];
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Progresso por tema</Text>
      {learningModules.map((module) => {
        const lessonsDone = module.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length;
        const quizCount = questionsForModule(module.id).length;
        const quizScore = progress.bestQuizScores[module.id] ?? 0;
        const total = module.lessons.length + quizCount;
        const done = lessonsDone + quizScore;
        return (
          <View key={module.id} style={styles.module}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: colors.text }]}>{module.title}</Text>
              <Text style={[styles.count, { color: colors.accent }]}>{done}/{total}</Text>
            </View>
            <ProgressBar value={total === 0 ? 0 : done / total} />
            <Text style={[styles.detail, { color: colors.tabIconDefault }]}>
              {lessonsDone}/{module.lessons.length} lições · quiz {quizScore}/{quizCount} melhor pontuação
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, gap: 18, padding: 16 },
  heading: { fontSize: 18, fontWeight: '900' },
  module: { gap: 7 },
  titleRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 8, justifyContent: 'space-between' },
  title: { flex: 1, fontSize: 14, fontWeight: '800' },
  count: { fontSize: 12, fontWeight: '900' },
  detail: { fontSize: 12, lineHeight: 18 },
});
