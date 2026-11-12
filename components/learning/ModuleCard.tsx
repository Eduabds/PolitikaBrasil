import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

type ModuleCardProps = {
  description: string;
  icon: SymbolName;
  onPress?: () => void;
  title: string;
};

export function ModuleCard({ description, icon, onPress, title }: ModuleCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <Pressable
      accessibilityHint="Abre o conteúdo deste módulo"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.82 : 1 },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.accentSoft }]}>
        <SymbolView name={icon} size={24} tintColor={colors.accent} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.tabIconDefault }]}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 96,
    padding: 14,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
