import { router } from 'expo-router';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon, type IconName } from '@/components/ui/icon';
import { NavLink } from '@/components/ui/nav-link';
import { Screen } from '@/components/ui/screen';
import { Section } from '@/components/ui/section';
import { Txt } from '@/components/ui/text';
import { USER } from '@/data/somme';

const ENTRIES: { href: string; label: string; icon: IconName; hint: string }[] = [
  { href: '/subscriptions', label: 'Abonnements', icon: 'repeat', hint: '6 actifs · 81 500 XAF / mois' },
  { href: '/accounts', label: 'Comptes', icon: 'wallet', hint: '3 comptes' },
  { href: '/settings', label: 'Paramètres', icon: 'cog', hint: 'Profil, devise, thème' },
];

export default function More() {
  const { c } = useTheme();

  return (
    <Screen title="Plus">
      <Card style={styles.profile}>
        <Avatar initials={USER.initials} />
        <View style={styles.profileText}>
          <Txt size="sm" weight={600}>
            {USER.firstName} N.
          </Txt>
          <Txt size="xs" tone="faint" numberOfLines={1}>
            {USER.email}
          </Txt>
        </View>
      </Card>

      <Section title="Gérer">
        <Card flush>
          {ENTRIES.map((entry, index) => (
            <NavLink
              key={entry.href}
              href={entry.href}
              style={[styles.row, index > 0 && { borderTopWidth: 1, borderTopColor: c.border }]}>
              <Icon name={entry.icon} size={20} color={c.inkSoft} />
              <View style={styles.rowText}>
                <Txt size="sm" weight={500}>
                  {entry.label}
                </Txt>
                <Txt size="xs" tone="faint">
                  {entry.hint}
                </Txt>
              </View>
              <Icon name="chevronRight" size={16} color={c.inkFaint} />
            </NavLink>
          ))}
        </Card>
      </Section>

      <Pressable accessibilityRole="button" onPress={() => router.replace('/sign-in')} style={styles.signOut}>
        <Txt size="sm" weight={600} tone="brand">
          Se déconnecter
        </Txt>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', gap: Space[3] },
  profileText: { flex: 1, minWidth: 0 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space[3],
    paddingVertical: Space[3],
    paddingHorizontal: Space[4],
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  rowText: { flex: 1, minWidth: 0 },
  signOut: { alignItems: 'center', paddingVertical: Space[3] },
});
