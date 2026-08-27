import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Brand, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Interrupteur 48×28 aux couleurs de la marque. */
export function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      style={[
        styles.track,
        { backgroundColor: value ? Brand[500] : c.border, justifyContent: value ? 'flex-end' : 'flex-start' },
      ]}>
      <View style={styles.knob} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: Radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  knob: { width: 22, height: 22, borderRadius: Radius.full, backgroundColor: '#fff' },
});
