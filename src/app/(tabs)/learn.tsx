import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { learningModules } from '@/constants/learningContent';
import { useColorScheme } from '@/components/useColorScheme';
import { ModuleCard } from '@/components/learning/ModuleCard';
import { ProgressSummaryCard } from '@/components/progress/ProgressSummaryCard';
import { useProgress } from '@/components/progress/ProgressProvider';
import { Screen } from '@/components/ui/Screen';

const icons = {
  'three-powers': { android: 'account_balance', ios: 'building.columns.fill', web: 'account_balance' },
  'electoral-system': { android: 'how_to_vote', ios: 'checkmark.seal.fill', web: 'how_to_vote' },
  'elected-offices': { android: 'badge', ios: 'person.badge.key.fill', web: 'badge' },
  'legislative-process': { android: 'description', ios: 'doc.text.fill', web: 'description' },
  'civic-participation': { android: 'groups', ios: 'person.3.fill', web: 'groups' },
} as const;

export default function LearnScreen() {
  const colors = Colors[useColorScheme()];
  const { progress } = useProgress();
  const totalLessons = learningModules.reduce((sum, module) => sum + module.lessons.length, 0);
  const xp = progress.completedLessonIds.length * 20
    + Object.values(progress.bestQuizScores).reduce<number>((sum, score) => sum + (score ?? 0) * 10, 0);

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={[styles.brand, { color: colors.accent }]}>POLITIKA BRASIL</Text>
        <Text style={[styles.title, { color: colors.text }]}>Entenda como o Brasil funciona.</Text>
        <Text style={[styles.description, { color: colors.tabIconDefault }]}>
          Conteúdo educativo, técnico e apartidário para fortalecer sua cidadania. 
          Não fazemos qualquer tipo de apologia, mas apenas compartilhamos conteúdo informativo.
        </Text>
      </View>

      <ProgressSummaryCard completedLessons={progress.completedLessonIds.length} totalLessons={totalLessons} xp={xp} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Trilhas de aprendizado</Text>
        {learningModules.map((module) => {
          const completed = module.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length;
          return (
            <ModuleCard
              key={module.id}
              description={module.description}
              icon={icons[module.id]}
              onPress={() => router.push(`/modules/${module.id}` as Href)}
              progressLabel={`${completed}/${module.lessons.length} lições`}
              title={module.title}
            />
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 8, marginBottom: 24 },
  brand: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  title: { fontSize: 30, fontWeight: '900', letterSpacing: -0.4 },
  description: { fontSize: 16, lineHeight: 24 },
  section: { gap: 12, marginTop: 28 },
  sectionTitle: { fontSize: 20, fontWeight: '800' },
});
