import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { ProgressBar } from '@/components/ui/ProgressBar';

type ProgressSummaryCardProps = {
  completedLessons: number;
  totalLessons: number;
  xp: number;
};

export function ProgressSummaryCard({ completedLessons, totalLessons, xp }: ProgressSummaryCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const progress = totalLessons === 0 ? 0 : completedLessons / totalLessons;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.eyebrow, { color: colors.accent }]}>SEU PROGRESSO</Text>
      <Text style={[styles.title, { color: colors.text }]}>Aprendiz cidadão</Text>
      <Text style={[styles.description, { color: colors.tabIconDefault }]}>
        {completedLessons} de {totalLessons} lições concluídas · {xp} XP
      </Text>
      <ProgressBar value={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
