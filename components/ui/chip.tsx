import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Brand, Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Icon } from '@/components/ui/icon';
import { Txt } from '@/components/ui/text';

export type FilterChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

/** Chip de filtre déroulante (liste des dépenses). */
export function FilterChip({ label, active, onPress }: FilterChipProps) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? Brand[100] : c.surface,
          borderColor: active ? Brand[200] : c.border,
        },
      ]}>
      <Txt size="xs" weight={500} color={active ? Brand[700] : c.inkSoft}>
        {label}
      </Txt>
      <Icon name="chevronDown" size={12} color={active ? Brand[700] : c.inkSoft} />
    </Pressable>
  );
}

/** Chip de catégorie : pastille de 10px dans la couleur assignée + libellé. */
export function CategoryChip({ label, color }: { label: string; color: string }) {
  const { c } = useTheme();
  return (
    <View style={[styles.category, { backgroundColor: c.surfaceSoft }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Txt size="xs" weight={500}>
        {label}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 32,
    paddingHorizontal: Space[3],
    borderWidth: 1,
    borderRadius: Radius.full,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 22,
    paddingHorizontal: Space[2],
    borderRadius: Radius.full,
  },
  dot: { width: 10, height: 10, borderRadius: Radius.full },
});
