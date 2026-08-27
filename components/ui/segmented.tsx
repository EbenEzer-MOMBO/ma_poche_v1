import { Platform, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Txt } from '@/components/ui/text';

export type SegmentedProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  height?: number;
  style?: ViewStyle;
};

/** Segment de type (Tout / Dépenses / Revenus, Dépense / Revenu, fréquence…). */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  height = 36,
  style,
}: SegmentedProps<T>) {
  const { c, shadow } = useTheme();
  return (
    <View style={[styles.track, { backgroundColor: c.surfaceSoft }, style]}>
      {options.map((option) => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option)}
            style={[
              styles.item,
              { height },
              active && { backgroundColor: c.surface, boxShadow: shadow.sm },
            ]}>
            <Txt size="sm" weight={active ? 600 : 500} tone={active ? 'ink' : 'soft'} numberOfLines={1}>
              {option}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row', gap: Space[1], padding: Space[1], borderRadius: Radius.md },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Space[1],
    borderRadius: Radius.sm,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
});
