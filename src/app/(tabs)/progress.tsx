import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Colors from '@/constants/Colors';
import { learningModules } from '@/constants/learningContent';
import { useColorScheme } from '@/components/useColorScheme';
import { useProgress } from '@/components/progress/ProgressProvider';
import { ProgressSummaryCard } from '@/components/progress/ProgressSummaryCard';
import { ModuleBreakdownCard } from '@/components/progress/ModuleBreakdownCard';
import { ActionButton } from '@/components/ui/ActionButton';
import { Screen } from '@/components/ui/Screen';

const totalLessons = learningModules.reduce((sum, module) => sum + module.lessons.length, 0);

function levelFor(xp: number) {
  if (xp < 100) return { label: 'Nível 1: Eleitor Curioso', lower: 0, upper: 100 };
  if (xp < 250) return { label: 'Nível 2: Observador Constitucional', lower: 100, upper: 250 };
  if (xp < 450) return { label: 'Nível 3: Cidadão Participativo', lower: 250, upper: 450 };
  return { label: 'Nível 4: Guardião da Democracia', lower: 450, upper: 700 };
}

export default function ProgressScreen() {
  const colors = Colors[useColorScheme()];
  const { progress, ready, setDisplayName } = useProgress();
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(progress.displayName);
  const xp = progress.completedLessonIds.length * 20
    + Object.values(progress.bestQuizScores).reduce<number>((sum, score) => sum + (score ?? 0) * 10, 0);
  const level = levelFor(xp);
  const levelProgress = Math.max(0, Math.min(1, (xp - level.lower) / (level.upper - level.lower)));
  const firstLesson = learningModules[0].lessons[0];

  return (
    <Screen>
      <View style={styles.greeting}>
        <View style={styles.greetingText}>
          <Text style={[styles.eyebrow, { color: colors.accent }]}>OLÁ,</Text>
          <Text style={[styles.name, { color: colors.text }]}>{progress.displayName}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Editar nome"
          hitSlop={10}
          onPress={() => { setDraftName(progress.displayName); setEditingName(true); }}
        >
          <Text style={[styles.edit, { color: colors.tint }]}>✎ Editar</Text>
        </Pressable>
      </View>
      <Text style={[styles.level, { color: colors.tabIconDefault }]}>{level.label}</Text>

      <ProgressSummaryCard
        completedLessons={progress.completedLessonIds.length}
        levelLabel={level.label}
        progressCaption={xp >= level.upper ? 'Nível máximo alcançado' : `Mais ${level.upper - xp} XP para o próximo nível`}
        progressValue={levelProgress}
        totalLessons={totalLessons}
        xp={xp}
      />

      {xp === 0 ? (
        <View style={[styles.emptyBanner, { backgroundColor: colors.accentSoft, borderColor: colors.border }]}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Sua jornada começa com uma lição</Text>
          <Text style={[styles.emptyDescription, { color: colors.tabIconDefault }]}>Leia no seu ritmo. Cada lição concluída vale 20 XP.</Text>
          <ActionButton onPress={() => router.push(`/lessons/${firstLesson.id}` as Href)}>
            Abrir primeira lição
          </ActionButton>
        </View>
      ) : null}

      <ModuleBreakdownCard progress={progress} />

      <Modal animationType="fade" transparent visible={editingName} onRequestClose={() => setEditingName(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Como podemos chamar você?</Text>
            <TextInput
              accessibilityLabel="Seu nome"
              autoCapitalize="words"
              autoFocus
              maxLength={32}
              onChangeText={setDraftName}
              onSubmitEditing={() => { setDisplayName(draftName); setEditingName(false); }}
              placeholder="Seu nome"
              placeholderTextColor={colors.tabIconDefault}
              returnKeyType="done"
              style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
              value={draftName}
            />
            <View style={styles.modalButtons}>
              <View style={styles.modalButton}><ActionButton onPress={() => setEditingName(false)} secondary>Cancelar</ActionButton></View>
              <View style={styles.modalButton}><ActionButton disabled={!ready} onPress={() => { setDisplayName(draftName); setEditingName(false); }}>Salvar</ActionButton></View>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  greeting: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  greetingText: { gap: 2 },
  eyebrow: { fontSize: 11, fontWeight: '900', letterSpacing: 0.8 },
  name: { fontSize: 28, fontWeight: '900' },
  edit: { fontSize: 14, fontWeight: '800' },
  level: { fontSize: 14, fontWeight: '700', marginBottom: 20, marginTop: 3 },
  emptyBanner: { borderRadius: 16, borderWidth: 1, gap: 10, marginTop: 18, padding: 16 },
  emptyTitle: { fontSize: 17, fontWeight: '900' },
  emptyDescription: { fontSize: 14, lineHeight: 21 },
  modalBackdrop: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.56)', flex: 1, justifyContent: 'center', padding: 24 },
  modalCard: { borderRadius: 18, borderWidth: 1, gap: 14, maxWidth: 440, padding: 20, width: '100%' },
  modalTitle: { fontSize: 20, fontWeight: '900' },
  input: { borderRadius: 12, borderWidth: 1, fontSize: 16, minHeight: 50, paddingHorizontal: 14 },
  modalButtons: { flexDirection: 'row', gap: 10 },
  modalButton: { flex: 1 },
});
