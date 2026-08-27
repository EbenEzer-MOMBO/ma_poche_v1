import type { IconName } from '@/components/ui/icon';

export type NavEntry = { href: string; label: string; icon: IconName };

/** Barre d'onglets mobile — 5 entrées + le FAB au centre (design system §5). */
export const TAB_ROUTES: NavEntry[] = [
  { href: '/home', label: 'Accueil', icon: 'home' },
  { href: '/transactions', label: 'Dépenses', icon: 'list' },
  { href: '/projects', label: 'Projets', icon: 'target' },
  { href: '/stats', label: 'Stats', icon: 'chart' },
  { href: '/more', label: 'Plus', icon: 'more' },
];

/** Barre latérale desktop — la navigation complète, sans FAB. */
export const SIDE_ROUTES: NavEntry[] = [
  { href: '/home', label: 'Accueil', icon: 'home' },
  { href: '/transactions', label: 'Dépenses & revenus', icon: 'list' },
  { href: '/accounts', label: 'Comptes', icon: 'wallet' },
  { href: '/projects', label: 'Projets', icon: 'target' },
  { href: '/subscriptions', label: 'Abonnements', icon: 'repeat' },
  { href: '/stats', label: 'Statistiques', icon: 'chart' },
  { href: '/settings', label: 'Paramètres', icon: 'cog' },
];

/** L'onglet « Plus » reste actif sur les écrans qu'il dessert. */
const UNDER_MORE = ['/subscriptions', '/accounts', '/settings'];

export function isActive(href: string, pathname: string) {
  if (href === '/more') return UNDER_MORE.some((p) => pathname.startsWith(p));
  return pathname.startsWith(href);
}
