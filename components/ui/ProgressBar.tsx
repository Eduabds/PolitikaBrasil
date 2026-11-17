import { StyleSheet, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  const colors = Colors[useColorScheme()];
  const percentage = Math.min(Math.max(value, 0), 1) * 100;

  return (
    <View
      accessibilityLabel={`${Math.round(percentage)}% concluído`}
      accessibilityRole="progressbar"
      style={[styles.track, { backgroundColor: colors.surfaceMuted }]}
    >
      <View style={[styles.fill, { backgroundColor: colors.accent, width: `${percentage}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { borderRadius: 999, height: 8, overflow: 'hidden' },
  fill: { borderRadius: 999, height: '100%' },
});
