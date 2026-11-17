import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type ActionButtonProps = PropsWithChildren<{
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
}>;

export function ActionButton({ children, disabled = false, onPress, secondary = false }: ActionButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: secondary ? colors.surface : colors.accent, borderColor: colors.accent },
        secondary && styles.secondary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.label, { color: secondary ? colors.accent : (colorScheme === 'dark' ? '#06172E' : '#FFFFFF') }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: 'center', borderRadius: 14, borderWidth: 1, justifyContent: 'center', minHeight: 52, paddingHorizontal: 18 },
  secondary: { borderWidth: 1 },
  disabled: { opacity: 0.42 },
  pressed: { opacity: 0.78 },
  label: { fontSize: 16, fontWeight: '800', textAlign: 'center' },
});
