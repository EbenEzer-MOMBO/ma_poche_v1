import { StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';

import { Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CardProps = ViewProps & {
  /** Retire le padding interne (listes qui gèrent le leur, ligne à ligne). */
  flush?: boolean;
  /** Liseré de gauche 4px — alerte d'échéance sur l'accueil. */
  accent?: string;
  style?: ViewStyle | ViewStyle[];
};

/** Surface, `--radius-lg`, `--shadow-sm` (design system §6). */
export function Card({ flush, accent, style, ...rest }: CardProps) {
  const { c, shadow } = useTheme();
  return (
    <View
      style={[
        styles.base,
        { backgroundColor: c.surface, borderColor: c.border, boxShadow: shadow.sm },
        !flush && styles.padded,
        accent ? { borderLeftWidth: 4, borderLeftColor: accent } : null,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: { borderWidth: 1, borderRadius: Radius.lg, overflow: 'hidden' },
  padded: { padding: Space[4] },
});
