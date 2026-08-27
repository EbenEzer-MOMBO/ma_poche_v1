import { StyleSheet, View } from 'react-native';

import { Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Icon, type IconName } from '@/components/ui/icon';
import { Txt } from '@/components/ui/text';

export type EmptyStateProps = {
  icon: IconName;
  title: string;
  body: string;
  /** Un seul bouton d'action primaire (design system §6). */
  action?: { title: string; onPress?: () => void };
};

/** Icône simple + une phrase + un CTA unique, centré dans la zone de contenu. */
export function EmptyState({ icon, title, body, action }: EmptyStateProps) {
  const { c } = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={[styles.icon, { backgroundColor: c.surfaceSoft }]}>
        <Icon name={icon} size={28} color={c.inkFaint} />
      </View>
      <View style={styles.copy}>
        <Txt size="lg" weight={600}>
          {title}
        </Txt>
        <Txt size="sm" tone="soft" style={styles.center}>
          {body}
        </Txt>
      </View>
      {action ? <Button title={action.title} onPress={action.onPress} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space[4],
    paddingHorizontal: Space[8],
  },
  icon: { width: 64, height: 64, borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center' },
  copy: { gap: Space[1], alignItems: 'center' },
  center: { textAlign: 'center' },
});
