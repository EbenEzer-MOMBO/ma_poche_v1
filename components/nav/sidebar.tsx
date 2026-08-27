import { router, usePathname } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

import { Brand, Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { SIDE_ROUTES, isActive } from '@/components/nav/routes';
import { Avatar } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { NavLink } from '@/components/ui/nav-link';
import { Txt } from '@/components/ui/text';
import { USER } from '@/data/somme';

export const SIDEBAR_WIDTH = 240;

/** Barre latérale fixe ≥1024px. Le FAB devient un bouton « Ajout rapide » en tête. */
export function Sidebar() {
  const { c } = useTheme();
  const pathname = usePathname();

  return (
    <View style={[styles.bar, { backgroundColor: c.surface, borderRightColor: c.border }]}>
      <View style={styles.brand}>
        <View style={styles.mark}>
          <Txt size="sm" weight={700} tone="onBrand">
            S
          </Txt>
        </View>
        <Txt size="lg" weight={600}>
          Somme
        </Txt>
      </View>

      <Button title="Ajout rapide" icon="plus" compact block onPress={() => router.push('/quick-add')} />

      <View style={styles.list}>
        {SIDE_ROUTES.map((route) => {
          const active = isActive(route.href, pathname);
          return (
            <NavLink
              key={route.href}
              href={route.href}
              selected={active}
              style={[styles.item, active && { backgroundColor: Brand[100] }]}>
              <Icon name={route.icon} size={20} color={active ? Brand[700] : c.inkSoft} />
              <Txt
                size="sm"
                weight={active ? 600 : 500}
                color={active ? Brand[700] : c.inkSoft}
                numberOfLines={1}>
                {route.label}
              </Txt>
            </NavLink>
          );
        })}
      </View>

      <View style={[styles.user, { backgroundColor: c.surfaceSoft }]}>
        <Avatar initials={USER.initials} size={32} />
        <View style={styles.userText}>
          <Txt size="sm" weight={500}>
            {USER.firstName} N.
          </Txt>
          <Txt size="xs" tone="faint" numberOfLines={1}>
            {USER.email}
          </Txt>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: SIDEBAR_WIDTH,
    borderRightWidth: 1,
    gap: Space[6],
    paddingVertical: Space[6],
    paddingHorizontal: Space[4],
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: Space[3], paddingHorizontal: Space[2] },
  mark: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Brand[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { gap: 2 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space[3],
    height: 44,
    paddingHorizontal: Space[3],
    borderRadius: Radius.md,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  user: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space[3],
    padding: Space[3],
    borderRadius: Radius.md,
  },
  userText: { flex: 1, minWidth: 0 },
});
