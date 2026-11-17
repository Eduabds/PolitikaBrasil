import { Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type QuizCardProps = {
  title: string;
  description: string;
  questionCount: number;
  bestScore?: number;
  onPress: () => void;
};

export function QuizCard({ title, description, questionCount, bestScore, onPress }: QuizCardProps) {
  const colors = Colors[useColorScheme()];
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.82 : 1 }]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.xp, { color: colors.accent }]}>até {questionCount * 10} XP</Text>
      </View>
      <Text style={[styles.description, { color: colors.tabIconDefault }]}>{description}</Text>
      <View style={styles.bottomRow}>
        <Text style={[styles.meta, { color: colors.tabIconDefault }]}>{questionCount} questões</Text>
        <Text style={[styles.meta, { color: bestScore === undefined ? colors.tabIconDefault : colors.accent }]}>
          {bestScore === undefined ? 'Não iniciado' : `Melhor: ${bestScore}/${questionCount}`}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, gap: 8, padding: 16 },
  topRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 8, justifyContent: 'space-between' },
  title: { flex: 1, fontSize: 17, fontWeight: '800' },
  xp: { fontSize: 12, fontWeight: '900' },
  description: { fontSize: 14, lineHeight: 21 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  meta: { fontSize: 12, fontWeight: '700' },
});
