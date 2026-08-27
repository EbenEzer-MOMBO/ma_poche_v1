import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Space, type Status } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Icon, type IconName } from '@/components/ui/icon';
import { Label, Txt, type TextSize } from '@/components/ui/text';

export type StatTileProps = {
  label: string;
  /** Montant déjà formaté (espaces fines insécables côté données). */
  value: string;
  currency?: string;
  size?: Extract<TextSize, 'hero' | '2xl'>;
  /** Variation : couleur de statut **+** icône **+** texte. */
  delta?: { text: string; tone: keyof typeof Status; icon?: IconName };
  caption?: string;
  style?: ViewStyle;
};

/** Tuile de statistique (solde total, total récurrent mensuel). */
export function StatTile({
  label,
  value,
  currency = 'XAF',
  size = 'hero',
  delta,
  caption,
  style,
}: StatTileProps) {
  return (
    <View style={[styles.wrap, style]}>
      <Label>{label}</Label>
      {size === 'hero' ? (
        <Txt size="hero" weight={700} tabular>
          {value}
        </Txt>
      ) : (
        <View style={styles.inline}>
          <Txt size="2xl" weight={700} tabular>
            {value}
          </Txt>
          <Txt size="sm" weight={500} tone="soft">
            {currency}
          </Txt>
        </View>
      )}
      {size === 'hero' || delta ? (
        <View style={styles.footer}>
          {size === 'hero' ? (
            <Txt size="sm" weight={500} tone="soft">
              {currency}
            </Txt>
          ) : null}
          {delta ? <Delta {...delta} /> : null}
        </View>
      ) : null}
      {caption ? (
        <Txt size="xs" tone="soft">
          {caption}
        </Txt>
      ) : null}
    </View>
  );
}

export function Delta({ text, tone, icon = 'trendUp' }: NonNullable<StatTileProps['delta']>) {
  const { c } = useTheme();
  return (
    <View style={styles.delta}>
      <Icon name={icon} size={13} color={c[tone]} />
      <Txt size="xs" weight={500} tone={tone}>
        {text}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Space[1] },
  inline: { flexDirection: 'row', alignItems: 'baseline', gap: Space[2] },
  footer: { flexDirection: 'row', alignItems: 'center', gap: Space[2] },
  delta: { flexDirection: 'row', alignItems: 'center', gap: Space[1] },
});
