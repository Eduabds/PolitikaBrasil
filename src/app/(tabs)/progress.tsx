import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { ProgressSummaryCard } from '@/components/progress/ProgressSummaryCard';
import { Screen } from '@/components/ui/Screen';

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Seu progresso</Text>
        <Text style={[styles.description, { color: colors.tabIconDefault }]}>
          Acompanhe seus avanços em cada tema, no seu ritmo.
        </Text>
      </View>

      <ProgressSummaryCard completedLessons={0} totalLessons={12} xp={0} />

      <View style={[styles.emptyState, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Sua jornada começa na aba Aprender</Text>
        <Text style={[styles.emptyDescription, { color: colors.tabIconDefault }]}>
          Ao concluir as primeiras lições, seus resultados e conquistas aparecerão aqui.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  emptyState: {
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    marginTop: 20,
    padding: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  emptyDescription: {
    fontSize: 14,
    lineHeight: 21,
  },
});
