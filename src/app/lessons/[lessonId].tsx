import { router, Stack, useLocalSearchParams } from 'expo-router';
import type { Href } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getLesson } from '@/constants/learningContent';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useProgress } from '@/components/progress/ProgressProvider';
import { SourceReferenceList } from '@/components/learning/SourceReferenceList';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ActionButton } from '@/components/ui/ActionButton';

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const entry = getLesson(lessonId);
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const { progress, ready, completeLesson } = useProgress();
  const [readProgress, setReadProgress] = useState(0);
  const [justCompleted, setJustCompleted] = useState(false);

  const allReferences = useMemo(() => entry?.lesson.sections.flatMap((section) => section.references) ?? [], [entry]);

  if (!entry) {
    return <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}><Text style={{ color: colors.text }}>Esta lição não foi encontrada.</Text></SafeAreaView>;
  }

  const { lesson, module } = entry;
  const lessonIndex = module.lessons.findIndex((item) => item.id === lesson.id);
  const nextLesson = module.lessons[lessonIndex + 1];
  const completed = progress.completedLessonIds.includes(lesson.id);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: lesson.title }} />
      <View style={styles.progressLine}><ProgressBar value={readProgress} /></View>
      <ScrollView
        contentContainerStyle={styles.content}
        onScroll={(event) => {
          const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
          const maxOffset = contentSize.height - layoutMeasurement.height;
          setReadProgress(maxOffset <= 0 ? 1 : Math.min(1, contentOffset.y / maxOffset));
        }}
        onContentSizeChange={(_width, height) => {
          if (height <= 500) setReadProgress(1);
        }}
        scrollEventThrottle={64}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.module, { color: colors.accent }]}>{module.title.toLocaleUpperCase('pt-BR')}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{lesson.title}</Text>
        <Text style={[styles.summary, { color: colors.tabIconDefault }]}>{lesson.summary} · {lesson.estimatedMinutes} min de leitura</Text>

        {lesson.sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>{section.heading}</Text>
            <Text style={[styles.body, { color: colors.text }]}>{section.body}</Text>
            {section.highlight ? (
              <View style={[styles.highlight, { backgroundColor: colors.accentSoft, borderColor: colors.border }]}>
                <Text style={[styles.highlightTitle, { color: colors.accent }]}>{section.highlight.title}</Text>
                <Text style={[styles.highlightBody, { color: colors.text }]}>{section.highlight.body}</Text>
              </View>
            ) : null}
          </View>
        ))}

        <SourceReferenceList references={allReferences} />
        <Text style={[styles.note, { color: colors.tabIconDefault }]}>Conteúdo educativo. Consulte as fontes oficiais para conferir o texto integral e eventuais atualizações.</Text>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background, borderColor: colors.border }]}>
        <ActionButton
          disabled={!ready}
          onPress={() => {
            completeLesson(lesson.id);
            setJustCompleted(true);
          }}
        >
          {completed || justCompleted ? 'Lição concluída ✓' : 'Concluir leitura · +20 XP'}
        </ActionButton>
        {justCompleted ? (
          <View style={styles.footerLinks}>
            {nextLesson ? (
              <Text onPress={() => router.replace(`/lessons/${nextLesson.id}` as Href)} style={[styles.footerLink, { color: colors.tint }]}>Próxima lição</Text>
            ) : null}
            <Text onPress={() => router.back()} style={[styles.footerLink, { color: colors.tint }]}>Voltar ao sumário</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  progressLine: { height: 8, paddingHorizontal: 20 },
  content: { gap: 20, padding: 20, paddingBottom: 28 },
  module: { fontSize: 11, fontWeight: '900', letterSpacing: 0.8 },
  title: { fontSize: 28, fontWeight: '900', lineHeight: 34, marginTop: -12 },
  summary: { fontSize: 14, lineHeight: 21, marginTop: -14 },
  section: { gap: 10 },
  sectionHeading: { fontSize: 21, fontWeight: '800', lineHeight: 28 },
  body: { fontSize: 17, lineHeight: 27 },
  highlight: { borderRadius: 14, borderWidth: 1, gap: 6, marginTop: 2, padding: 14 },
  highlightTitle: { fontSize: 14, fontWeight: '900' },
  highlightBody: { fontSize: 14, lineHeight: 21 },
  note: { fontSize: 12, lineHeight: 18 },
  footer: { borderTopWidth: 1, gap: 8, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  footerLinks: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  footerLink: { fontSize: 14, fontWeight: '800', paddingVertical: 6 },
});
