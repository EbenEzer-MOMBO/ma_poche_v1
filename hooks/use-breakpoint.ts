import { useWindowDimensions } from 'react-native';

import { DESKTOP_MIN_WIDTH } from '@/constants/theme';

/**
 * Barre latérale fixe à partir de 1024px, barre d'onglets + FAB en dessous
 * (design system §5).
 */
export function useIsDesktop() {
  return useWindowDimensions().width >= DESKTOP_MIN_WIDTH;
}
