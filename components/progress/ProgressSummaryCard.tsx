import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { ProgressBar } from '@/components/ui/ProgressBar';

type ProgressSummaryCardProps = {
  completedLessons: number;
  totalLessons: number;
  xp: number;
  progressValue?: number;
  levelLabel?: string;
  progressCaption?: string;
};

export function ProgressSummaryCard({ completedLessons, totalLessons, xp, progressValue, levelLabel, progressCaption }: ProgressSummaryCardProps) {
  const colors = Colors[useColorScheme()];
  const progress = progressValue ?? (totalLessons === 0 ? 0 : completedLessons / totalLessons);

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.eyebrow, { color: colors.accent }]}>SEU PROGRESSO</Text>
      <Text style={[styles.title, { color: colors.text }]}>{levelLabel ?? 'Aprendiz cidadão'}</Text>
      <Text style={[styles.xp, { color: colors.accent }]}>{xp} XP</Text>
      <Text style={[styles.description, { color: colors.tabIconDefault }]}>
        {completedLessons} de {totalLessons} lições concluídas
      </Text>
      <ProgressBar value={progress} />
      {progressCaption ? <Text style={[styles.caption, { color: colors.tabIconDefault }]}>{progressCaption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, gap: 8, padding: 16 },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 0.8 },
  title: { fontSize: 22, fontWeight: '800' },
  xp: { fontSize: 16, fontWeight: '900' },
  description: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 18 },
});
