import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';

export const unstable_settings = { anchor: 'index' };

export default function RootLayout() {
  const { c, scheme } = useTheme();

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }}>
        {/* La feuille d'ajout rapide se superpose à l'app, elle ne la remplace pas. */}
        <Stack.Screen
          name="quick-add"
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
      </Stack>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaProvider>
  );
}
