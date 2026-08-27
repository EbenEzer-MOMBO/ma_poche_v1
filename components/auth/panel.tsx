import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Radius, Space } from '@/constants/theme';
import { useIsDesktop } from '@/hooks/use-breakpoint';
import { useTheme } from '@/hooks/use-theme';
import { Icon } from '@/components/ui/icon';
import { Txt } from '@/components/ui/text';

export type AuthPanelProps = {
  children: ReactNode;
  /** Flèche de retour dans la barre de statut (écrans secondaires). */
  back?: boolean;
  /** Bas d'écran mobile : « Pas encore de compte ? Créer un compte ». */
  footer?: ReactNode;
};

/**
 * Ossature des écrans d'authentification : colonne pleine hauteur au mobile,
 * carte centrée de 420px au desktop. Pas de navigation — l'utilisateur n'est
 * pas encore dans l'app.
 */
export function AuthPanel({ children, back, footer }: AuthPanelProps) {
  const { c, shadow } = useTheme();
  const desktop = useIsDesktop();

  if (desktop) {
    return (
      <View style={[styles.stage, { backgroundColor: c.bg }]}>
        <View
          style={[
            styles.card,
            { backgroundColor: c.surface, borderColor: c.border, boxShadow: shadow.md },
          ]}>
          {children}
          {footer}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: c.bg }]}>
      <View style={styles.statusBar}>
        {back ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Revenir en arrière"
            onPress={() => router.back()}
            style={styles.backButton}>
            <Icon name="back" size={22} color={c.inkSoft} />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.body}>{children}</View>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

/** Lien de bas d'écran : « Déjà inscrit ? **Se connecter** ». */
export function AuthSwitch({ label, action, onPress }: { label: string; action: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress} style={styles.switch}>
      <Txt size="sm" tone="soft">
        {label}
      </Txt>
      <Txt size="sm" weight={600} tone="brand">
        {action}
      </Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Space[6] },
  card: {
    width: 420,
    maxWidth: '100%',
    gap: Space[6],
    padding: Space[8],
    borderWidth: 1,
    borderRadius: Radius.lg,
  },
  statusBar: { height: 44, justifyContent: 'flex-end', paddingHorizontal: Space[5] },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  body: { flex: 1, justifyContent: 'center', gap: Space[6], paddingHorizontal: Space[6] },
  footer: { paddingHorizontal: Space[6], paddingVertical: Space[5] },
  switch: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
});
