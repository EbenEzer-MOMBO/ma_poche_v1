/**
 * Somme — jetons de design (source unique).
 * Transposition RN/RNW de `tokens.css` du design system v1.
 * Rien d'autre dans l'app ne doit contenir une valeur brute de couleur,
 * d'espacement ou de rayon.
 */
import { Platform, type TextStyle } from 'react-native';

/** Violet de marque — UI seulement, jamais comme couleur de série d'un graphe. */
export const Brand = {
  50: '#f6f2ff',
  100: '#ece3ff',
  200: '#d7c5ff',
  300: '#bb9dfd',
  400: '#9d75f7',
  500: '#7c4dee',
  600: '#6935d6',
  700: '#5528ac',
  800: '#442086',
  900: '#331861',
} as const;

/** Statuts — toujours accompagnés d'une icône et d'un libellé. */
export const Status = {
  good: '#0ca30c',
  warning: '#fab219',
  serious: '#ec835a',
  critical: '#d03b3b',
} as const;

/** Palette catégorielle validée CVD. L'ordre est le mécanisme de sécurité : ne jamais le réordonner. */
const CHART_LIGHT = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'];
const CHART_DARK = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'];

export type Scheme = 'light' | 'dark';

export type Palette = Record<keyof typeof Status, string> & {
  bg: string;
  surface: string;
  surfaceSoft: string;
  border: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  brandText: string;
  scrim: string;
  /** Palette catégorielle du thème, indexée par le slot de la catégorie. */
  chart: readonly string[];
};

export const Colors: Record<Scheme, Palette> = {
  light: {
    bg: '#faf9fc',
    surface: '#ffffff',
    surfaceSoft: '#f1eef8',
    border: '#e4dff0',
    ink: '#1c1730',
    inkSoft: '#5b5570',
    inkFaint: '#8b859c',
    brandText: Brand[600],
    scrim: 'rgba(28,23,48,.45)',
    chart: CHART_LIGHT,
    ...Status,
  },
  dark: {
    bg: '#0e0c14',
    surface: '#171320',
    surfaceSoft: '#1f1a2b',
    border: '#2c2640',
    ink: '#f3f1fa',
    inkSoft: '#b9b3cc',
    inkFaint: '#837da0',
    brandText: Brand[400],
    scrim: 'rgba(0,0,0,.6)',
    chart: CHART_DARK,
    ...Status,
  },
};

/** Grille de 4px. */
export const Space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
  11: 80,
} as const;

export const Radius = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 } as const;

export type Shadows = { sm: string; md: string; lg: string };

/** `boxShadow` est supporté par RN 0.81 (nouvelle architecture) et RNW. */
export const Shadow: Record<Scheme, Shadows> = {
  light: {
    sm: '0 1px 2px rgba(28,23,48,.06)',
    md: '0 4px 16px -4px rgba(28,23,48,.12)',
    lg: '0 12px 32px -8px rgba(28,23,48,.18)',
  },
  dark: {
    sm: '0 1px 2px rgba(0,0,0,.4)',
    md: '0 4px 16px -4px rgba(0,0,0,.5)',
    lg: '0 12px 32px -8px rgba(0,0,0,.6)',
  },
};

/**
 * Une seule famille, variable, chargée une fois côté web via `app/+html.tsx`
 * (preconnect + `display=swap`). Sur natif, la police système sert de repli :
 * aucun `.ttf` embarqué, donc aucun blocage au démarrage.
 */
export const fontFamily = Platform.select({
  web: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  default: 'System',
})!;

/** Échelle typographique (1rem = 16px). */
export const Type = {
  xs: { fontSize: 12, lineHeight: 17 },
  sm: { fontSize: 14, lineHeight: 21 },
  base: { fontSize: 16, lineHeight: 26 },
  lg: { fontSize: 18, lineHeight: 27 },
  xl: { fontSize: 22, lineHeight: 29 },
  '2xl': { fontSize: 28, lineHeight: 34 },
  hero: { fontSize: 44, lineHeight: 48 },
} as const satisfies Record<string, TextStyle>;

/** Montants alignés en colonne. */
export const tabular = { fontVariant: ['tabular-nums'] } as const satisfies TextStyle;

/** Barre latérale à partir de 1024px, barre d'onglets en dessous. */
export const DESKTOP_MIN_WIDTH = 1024;
