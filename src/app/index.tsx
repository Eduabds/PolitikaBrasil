import { Redirect, router } from 'expo-router';
import type { Href } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useProgress } from '@/components/progress/ProgressProvider';
import { ActionButton } from '@/components/ui/ActionButton';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function WelcomeScreen() {
  const colors = Colors[useColorScheme()];
  const { completeOnboarding, progress, ready } = useProgress();
  const [name, setName] = useState('');
  const trimmedName = name.trim();

  if (!ready) {
    return (
      <SafeAreaView style={[styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.accent} size="large" />
      </SafeAreaView>
    );
  }

  if (progress.hasCompletedOnboarding) {
    return <Redirect href={'/learn' as Href} />;
  }

  function handleConfirm() {
    if (!trimmedName) return;
    completeOnboarding(trimmedName);
    router.replace('/learn' as Href);
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', default: undefined })}
        style={styles.keyboardContainer}
      >
        <View style={styles.content}>
          <View style={[styles.badge, { backgroundColor: colors.accentSoft }]}>
            <Text style={[styles.badgeText, { color: colors.accent }]}>POLITIKA BRASIL</Text>
          </View>

          <View style={styles.introduction}>
            <Text style={[styles.title, { color: colors.text }]}>Boas-vindas!</Text>
            <Text style={[styles.description, { color: colors.tabIconDefault }]}>Aqui você aprende, no seu ritmo, como funcionam as instituições e os processos políticos do Brasil.</Text>
            <Text style={[styles.description, { color: colors.tabIconDefault }]}>O conteúdo é educativo, técnico e apartidário — feito para fortalecer sua cidadania. Não fazemos qualquer tipo de apologia, mas apenas compartilhamos conteúdo informativo.</Text>
          </View>

          <View style={styles.form}>
            <Text style={[styles.label, { color: colors.text }]}>Como podemos chamar você?</Text>
            <TextInput
              accessibilityLabel="Seu nome"
              autoCapitalize="words"
              autoFocus
              maxLength={32}
              onChangeText={setName}
              onSubmitEditing={handleConfirm}
              placeholder="Digite seu nome"
              placeholderTextColor={colors.tabIconDefault}
              returnKeyType="done"
              style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
              value={name}
            />
          </View>

          <View style={styles.action}>
            <ActionButton disabled={!trimmedName} onPress={handleConfirm}>Confirmar</ActionButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  loading: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  keyboardContainer: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  badge: { alignSelf: 'flex-start', borderRadius: 999, marginBottom: 28, paddingHorizontal: 12, paddingVertical: 7 },
  badgeText: { fontSize: 12, fontWeight: '900', letterSpacing: 0.9 },
  introduction: { gap: 14 },
  title: { fontSize: 36, fontWeight: '900', letterSpacing: -0.7 },
  description: { fontSize: 17, lineHeight: 26 },
  form: { gap: 8, marginTop: 44 },
  label: { fontSize: 16, fontWeight: '800' },
  input: { borderRadius: 14, borderWidth: 1, fontSize: 17, minHeight: 54, paddingHorizontal: 16 },
  action: { marginTop: 16 },
});
