import { useMemo } from 'react';

import { Colors, Shadow, type Palette, type Scheme, type Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type Theme = {
  scheme: Scheme;
  /** Palette du thème courant. */
  c: Palette;
  /** Ombres du thème courant (chaînes `boxShadow`). */
  shadow: Shadows;
};

/** Thème clair/sombre à parité — aucun des deux n'est un mode secondaire. */
export function useTheme(): Theme {
  const scheme: Scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return useMemo(() => ({ scheme, c: Colors[scheme], shadow: Shadow[scheme] }), [scheme]);
}
