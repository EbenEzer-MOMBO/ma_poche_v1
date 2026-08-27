import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Txt } from '@/components/ui/text';

export type ToastProps = {
  message: string;
  action?: { label: string; onPress: () => void };
  onDismiss: () => void;
  /** Durée avant disparition (ms). */
  duration?: number;
};

/** Fond `--ink` inversé quel que soit le thème, ancré au-dessus de la barre d'onglets. */
export function Toast({ message, action, onDismiss, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const { c } = useTheme();
  return (
    <View style={[styles.toast, { backgroundColor: c.ink }]}>
      <Txt size="sm" weight={500} color={c.bg} style={styles.message} numberOfLines={2}>
        {message}
      </Txt>
      {action ? (
        <Pressable accessibilityRole="button" onPress={action.onPress} style={styles.action}>
          <Txt size="sm" weight={600} color={c.bg}>
            {action.label}
          </Txt>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Space[4],
    paddingVertical: Space[3],
    paddingHorizontal: Space[4],
    borderRadius: Radius.md,
  },
  message: { flex: 1 },
  action: { ...Platform.select({ web: { cursor: 'pointer' } }) },
});
