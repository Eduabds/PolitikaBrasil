import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { ModuleCard } from '@/components/learning/ModuleCard';
import { ProgressSummaryCard } from '@/components/progress/ProgressSummaryCard';
import { Screen } from '@/components/ui/Screen';

export default function LearnScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={[styles.brand, { color: colors.accent }]}>POLITIKA BRASIL</Text>
        <Text style={[styles.title, { color: colors.text }]}>Entenda como o Brasil funciona.</Text>
        <Text style={[styles.description, { color: colors.tabIconDefault }]}>
          Conteúdo educativo, técnico e apartidário para fortalecer sua cidadania.
        </Text>
      </View>

      <ProgressSummaryCard completedLessons={0} totalLessons={12} xp={0} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Trilhas de aprendizado</Text>
        <ModuleCard
          description="Conheça as responsabilidades do Executivo, Legislativo e Judiciário."
          icon={{ android: 'account_balance', ios: 'building.columns.fill', web: 'account_balance' }}
          title="Os Três Poderes"
        />
        <ModuleCard
          description="Entenda como funcionam os votos majoritário e proporcional."
          icon={{ android: 'how_to_vote', ios: 'checkmark.seal.fill', web: 'how_to_vote' }}
          title="Sistema Eleitoral"
        />
        <ModuleCard
          description="Acompanhe o caminho de uma proposta até se tornar lei."
          icon={{ android: 'description', ios: 'doc.text.fill', web: 'description' }}
          title="Processo Legislativo"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 8,
    marginBottom: 24,
  },
  brand: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    gap: 12,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
});
