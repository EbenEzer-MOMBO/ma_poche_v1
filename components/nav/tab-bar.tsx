import { usePathname } from 'expo-router';
import { Fragment } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { TAB_ROUTES, isActive } from '@/components/nav/routes';
import { Icon } from '@/components/ui/icon';
import { NavLink } from '@/components/ui/nav-link';
import { Txt } from '@/components/ui/text';

/**
 * Barre fixe en bas + FAB 56px à cheval. Le padding bas suit la zone sûre
 * (design system §7), avec un minimum de 20px comme sur la maquette.
 */
export function TabBar() {
  const { c, shadow } = useTheme();
  const pathname = usePathname();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: c.surface,
          borderTopColor: c.border,
          boxShadow: shadow.lg,
          paddingBottom: Math.max(bottom, 20),
        },
      ]}>
      <Fab />
      <View style={styles.row}>
        {TAB_ROUTES.map((route, index) => {
          const active = isActive(route.href, pathname);
          return (
            <Fragment key={route.href}>
              {/* Sixième colonne réservée sous le FAB. */}
              {index === 2 ? <View style={styles.item} /> : null}
              <NavLink href={route.href} role="tab" selected={active} style={styles.item}>
                <Icon
                  name={route.icon}
                  size={22}
                  filled={active}
                  color={active ? Brand[600] : c.inkFaint}
                />
                <Txt size="xs" weight={500} color={active ? Brand[600] : c.inkFaint}>
                  {route.label}
                </Txt>
              </NavLink>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}

/** Action par défaut : ajout rapide d'une dépense. */
export function Fab() {
  const { shadow } = useTheme();
  return (
    <NavLink href="/quick-add" role="button" label="Ajout rapide" style={[styles.fab, { boxShadow: shadow.lg }]}>
      <Icon name="plus" size={26} color="#fff" />
    </NavLink>
  );
}

const styles = StyleSheet.create({
  bar: { borderTopWidth: 1, paddingTop: Space[2] },
  row: { flexDirection: 'row' },
  item: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  fab: {
    position: 'absolute',
    left: '50%',
    top: -24,
    transform: [{ translateX: -28 }],
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    backgroundColor: Brand[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
});
