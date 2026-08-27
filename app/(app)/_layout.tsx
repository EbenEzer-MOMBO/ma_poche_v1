import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useIsDesktop } from '@/hooks/use-breakpoint';
import { useTheme } from '@/hooks/use-theme';
import { Sidebar } from '@/components/nav/sidebar';
import { TabBar } from '@/components/nav/tab-bar';

/** Barre latérale fixe ≥1024px, barre d'onglets + FAB en dessous (design system §5). */
export default function AppLayout() {
  const { c } = useTheme();
  const desktop = useIsDesktop();

  return (
    <View style={[styles.shell, { backgroundColor: c.bg }]}>
      {desktop ? <Sidebar /> : null}
      <View style={styles.pane}>
        <Tabs
          screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: c.bg } }}
          tabBar={() => (desktop ? null : <TabBar />)}>
          <Tabs.Screen name="home" />
          <Tabs.Screen name="transactions" />
          <Tabs.Screen name="projects" />
          <Tabs.Screen name="stats" />
          <Tabs.Screen name="more" />
          {/* Écrans desservis par « Plus » ou la barre latérale, hors barre d'onglets. */}
          <Tabs.Screen name="accounts" options={{ href: null }} />
          <Tabs.Screen name="settings" options={{ href: null }} />
          <Tabs.Screen name="subscriptions" options={{ href: null }} />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, flexDirection: 'row' },
  pane: { flex: 1, minWidth: 0 },
});
