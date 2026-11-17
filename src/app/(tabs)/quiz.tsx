import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { learningModules } from '@/constants/learningContent';
import { questionsForModule } from '@/constants/quizContent';
import { useProgress } from '@/components/progress/ProgressProvider';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { QuizCard } from '@/components/quiz/QuizCard';
import { Screen } from '@/components/ui/Screen';

export default function QuizScreen() {
  const colors = Colors[useColorScheme()];
  const { progress } = useProgress();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Quiz por tema</Text>
        <Text style={[styles.description, { color: colors.tabIconDefault }]}>Responda cenários, revise suas escolhas e confira as explicações no final.</Text>
      </View>
      <View style={styles.list}>
        {learningModules.map((module) => {
          const count = questionsForModule(module.id).length;
          return (
            <QuizCard
              key={module.id}
              bestScore={progress.bestQuizScores[module.id]}
              description={module.description}
              onPress={() => router.push(`/quiz/${module.id}` as Href)}
              questionCount={count}
              title={module.title}
            />
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: 8, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '900' },
  description: { fontSize: 16, lineHeight: 24 },
  list: { gap: 12 },
});
