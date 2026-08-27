import { StyleSheet, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Txt } from '@/components/ui/text';

export type ProgressProps = {
  name: string;
  /** Ratio 0–1. */
  value: number;
  color: string;
  /** « X / Y XAF · reste Z ». */
  caption: string;
};

/** Barre de progression de projet : piste 8px, remplissage plat, libellé dessous. */
export function Progress({ name, value, color, caption }: ProgressProps) {
  const { c } = useTheme();
  const pct = Math.round(Math.min(Math.max(value, 0), 1) * 100);
  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <Txt size="sm" weight={500} style={styles.name} numberOfLines={1}>
          {name}
        </Txt>
        <Txt size="xs" tone="soft" tabular>
          {pct} %
        </Txt>
      </View>
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ now: pct, min: 0, max: 100 }}
        style={[styles.track, { backgroundColor: c.surfaceSoft }]}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <Txt size="xs" tone="faint" tabular>
        {caption}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  head: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 },
  name: { flexShrink: 1 },
  track: { height: 8, borderRadius: Radius.full, overflow: 'hidden' },
  fill: { height: 8, borderRadius: Radius.full },
});
