import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { ModuleCard } from '@/components/learning/ModuleCard';
import { Screen } from '@/components/ui/Screen';

export default function QuizScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.description, { color: colors.tabIconDefault }]}>
          Responda perguntas e receba explicações para consolidar o aprendizado.
        </Text>
      </View>

      <View style={[styles.callout, { backgroundColor: colors.accentSoft, borderColor: colors.border }]}>
        <Text style={[styles.calloutTitle, { color: colors.text }]}>Como funcionará</Text>
        <Text style={[styles.calloutText, { color: colors.tabIconDefault }]}>
          Você poderá escolher um tema, responder uma sessão curta e revisar cada explicação.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Prepare-se por tema</Text>
        <ModuleCard
          description="Revise os poderes antes de iniciar seu primeiro desafio."
          icon={{ android: 'school', ios: 'graduationcap.fill', web: 'school' }}
          title="Os Três Poderes"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  callout: {
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    marginTop: 24,
    padding: 16,
  },
  calloutTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  calloutText: {
    fontSize: 14,
    lineHeight: 21,
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
