import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { Space } from '@/constants/theme';
import { Label, Txt } from '@/components/ui/text';

export type SectionProps = {
  title: string;
  children: ReactNode;
  /** Lien « Tout voir » aligné à droite de l'intitulé. */
  onSeeAll?: () => void;
  seeAllLabel?: string;
  style?: ViewStyle;
};

/** Intitulé de section + lien optionnel, réutilisé sur tout le tableau de bord. */
export function Section({ title, children, onSeeAll, seeAllLabel = 'Tout voir', style }: SectionProps) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.head}>
        <Label>{title}</Label>
        {onSeeAll ? (
          <Pressable accessibilityRole="link" onPress={onSeeAll}>
            <Txt size="xs" weight={600} tone="brand">
              {seeAllLabel}
            </Txt>
          </Pressable>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Space[3] },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
