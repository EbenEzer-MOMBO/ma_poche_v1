import type { ReactNode } from 'react';
import { router } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Space } from '@/constants/theme';
import { useIsDesktop } from '@/hooks/use-breakpoint';
import { useTheme } from '@/hooks/use-theme';
import { Icon } from '@/components/ui/icon';
import { Txt } from '@/components/ui/text';

export type ScreenProps = {
  children: ReactNode;
  /** Titre d'écran (`--text-xl`), rendu au-dessus de la zone défilante. */
  title?: string;
  /** Action alignée à droite du titre. */
  action?: ReactNode;
  /** Bloc non défilant sous le titre (segment de type, filtres). */
  sticky?: ReactNode;
  /** Contenu centré sans défilement (états vides, écrans d'authentification). */
  centered?: boolean;
  /** Barre d'action collée en bas (formulaire d'abonnement). */
  footer?: ReactNode;
  /** Flèche de retour au-dessus du titre (écrans de détail). */
  back?: boolean;
  /** Action alignée à droite de la flèche de retour (« Supprimer »). */
  navAction?: ReactNode;
  contentStyle?: ViewStyle;
};

/**
 * Ossature commune à tous les écrans : fond de page, zones sûres, largeur de
 * contenu limitée à 960px au desktop (design system §5).
 */
export function Screen({
  children,
  title,
  action,
  sticky,
  centered,
  footer,
  back,
  navAction,
  contentStyle,
}: ScreenProps) {
  const { c } = useTheme();
  const desktop = useIsDesktop();
  const gutter = desktop ? Space[8] : Space[4];

  const header =
    title || sticky ? (
      <View style={[styles.head, { paddingHorizontal: gutter, paddingTop: desktop ? Space[7] : Space[2] }]}>
        {title ? (
          <View style={styles.titleRow}>
            <Txt size="xl" weight={600} style={styles.title}>
              {title}
            </Txt>
            {action}
          </View>
        ) : null}
        {sticky}
      </View>
    ) : null;

  const body = centered ? (
    <View style={[styles.centered, { paddingHorizontal: gutter }, contentStyle]}>{children}</View>
  ) : (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[
        styles.content,
        {
          paddingHorizontal: gutter,
          paddingTop: header ? 0 : desktop ? Space[7] : Space[4],
          paddingBottom: Space[6],
        },
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={desktop ? styles.measure : undefined}>{children}</View>
    </ScrollView>
  );

  return (
    <SafeAreaView edges={['top']} style={[styles.flex, { backgroundColor: c.bg }]}>
      {back || navAction ? (
        <View style={[styles.nav, { paddingHorizontal: desktop ? Space[8] : Space[4] }]}>
          {back ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Revenir en arrière"
              onPress={() => router.back()}
              style={styles.backButton}>
              <Icon name="back" size={22} color={c.inkSoft} />
            </Pressable>
          ) : (
            <View />
          )}
          {navAction}
        </View>
      ) : null}
      {header}
      {body}
      {footer ? (
        <View style={[styles.footer, { backgroundColor: c.surface, borderTopColor: c.border, paddingHorizontal: gutter }]}>
          {footer}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  head: { gap: Space[3], paddingBottom: Space[3] },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Space[3] },
  title: { flexShrink: 1 },
  content: { gap: Space[5], width: '100%' },
  measure: { maxWidth: 960, width: '100%', gap: Space[5] },
  centered: { flex: 1, justifyContent: 'center' },
  nav: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    marginLeft: -Space[2],
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  footer: { borderTopWidth: 1, paddingTop: Space[4], paddingBottom: Space[4] },
});
