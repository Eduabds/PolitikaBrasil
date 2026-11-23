import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';
import { ProgressProvider } from '@/components/progress/ProgressProvider';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProgressProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: colorScheme === 'dark' ? '#06172E' : '#F5F9FD' } }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modules/[moduleId]" options={{ title: 'Tema', headerBackTitle: 'Aprender' }} />
          <Stack.Screen name="lessons/[lessonId]" options={{ title: 'Lição', headerBackTitle: 'Tema' }} />
          <Stack.Screen name="quiz/[moduleId]" options={{ title: 'Quiz', headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ProgressProvider>
  );
}
