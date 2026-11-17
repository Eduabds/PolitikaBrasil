import { router, Stack, useLocalSearchParams } from 'expo-router';
import type { Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { getModule } from '@/constants/learningContent';
import { useProgress } from '@/components/progress/ProgressProvider';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ActionButton } from '@/components/ui/ActionButton';
import { Screen } from '@/components/ui/Screen';

export default function ModuleScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const module = getModule(moduleId);
  const colors = Colors[useColorScheme()];
  const { progress } = useProgress();

  if (!module) {
    return <Screen><Text style={{ color: colors.text }}>Este tema não foi encontrado.</Text></Screen>;
  }

  const completedCount = module.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length;
  const allCompleted = completedCount === module.lessons.length;

  return (
    <Screen>
      <Stack.Screen options={{ title: module.title }} />
      <View style={styles.header}>
        <Text style={[styles.kicker, { color: colors.accent }]}>TRILHA DE APRENDIZADO</Text>
        <Text style={[styles.title, { color: colors.text }]}>{module.title}</Text>
        <Text style={[styles.description, { color: colors.tabIconDefault }]}>{module.description}</Text>
        <Text style={[styles.count, { color: colors.accent }]}>{completedCount} de {module.lessons.length} lições concluídas</Text>
      </View>
      <View style={styles.lessonList}>
        {module.lessons.map((lesson, index) => {
          const isComplete = progress.completedLessonIds.includes(lesson.id);
          return (
            <View key={lesson.id} style={[styles.lesson, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.lessonTitleRow}>
                <Text style={[styles.number, { color: colors.accent }]}>{String(index + 1).padStart(2, '0')}</Text>
                <Text style={[styles.lessonTitle, { color: colors.text }]}>{lesson.title}</Text>
                <Text accessibilityLabel={isComplete ? 'Lição concluída' : 'Lição não concluída'} style={[styles.check, { color: isComplete ? colors.accent : colors.tabIconDefault }]}>
                  {isComplete ? '✓' : '○'}
                </Text>
              </View>
              <Text style={[styles.summary, { color: colors.tabIconDefault }]}>{lesson.summary}</Text>
              <Text style={[styles.time, { color: colors.tabIconDefault }]}>{lesson.estimatedMinutes} min de leitura</Text>
              <ActionButton onPress={() => router.push(`/lessons/${lesson.id}` as Href)} secondary>
                {isComplete ? 'Ler novamente' : 'Começar lição'}
              </ActionButton>
            </View>
          );
        })}
      </View>
      {allCompleted ? (
        <View style={styles.quizCta}>
          <Text style={[styles.quizCopy, { color: colors.text }]}>Você concluiu as lições deste tema. Que tal testar o que aprendeu?</Text>
          <ActionButton onPress={() => router.push(`/quiz/${module.id}` as Href)}>
            Testar conhecimentos neste tema
          </ActionButton>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: 8, marginBottom: 24 },
  kicker: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  title: { fontSize: 26, fontWeight: '900' },
  description: { fontSize: 15, lineHeight: 22 },
  count: { fontSize: 14, fontWeight: '800', marginTop: 4 },
  lessonList: { gap: 12 },
  lesson: { borderRadius: 16, borderWidth: 1, gap: 10, padding: 15 },
  lessonTitleRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  number: { fontSize: 13, fontWeight: '900' },
  lessonTitle: { flex: 1, fontSize: 17, fontWeight: '800' },
  check: { fontSize: 20, fontWeight: '800' },
  summary: { fontSize: 14, lineHeight: 21 },
  time: { fontSize: 12, fontWeight: '700' },
  quizCta: { gap: 12, marginTop: 24 },
  quizCopy: { fontSize: 16, fontWeight: '700', lineHeight: 23 },
});
