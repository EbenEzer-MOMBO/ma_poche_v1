import { StyleSheet, View } from 'react-native';

import { Radius, Space, Status } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Icon, type IconName } from '@/components/ui/icon';
import { Txt } from '@/components/ui/text';

export type BadgeProps = {
  label: string;
  tone?: keyof typeof Status;
  icon?: IconName;
};

/** Badge de statut — icône **et** libellé, jamais la couleur seule (§2.3). */
export function Badge({ label, tone = 'warning', icon = 'warn' }: BadgeProps) {
  const { c } = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: c.surfaceSoft }]}>
      <Icon name={icon} size={11} color={c[tone]} />
      <Txt size="xs" weight={600} tone={tone}>
        {label}
      </Txt>
    </View>
  );
}

/** Pastille de compte / avatar en initiales. */
export function Avatar({ initials, size = 40 }: { initials: string; size?: number }) {
  const { c } = useTheme();
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, backgroundColor: c.surfaceSoft },
      ]}>
      <Txt size="sm" weight={600} tone="brand">
        {initials}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space[1],
    height: 20,
    paddingHorizontal: Space[2],
    borderRadius: Radius.full,
  },
  avatar: { alignItems: 'center', justifyContent: 'center', borderRadius: Radius.full },
});
