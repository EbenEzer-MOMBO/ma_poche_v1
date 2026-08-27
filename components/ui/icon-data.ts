/**
 * Jeu d'icônes du design system, décrit en données pour éviter un composant
 * par glyphe — et pour être rendu à l'identique par les deux implémentations
 * de `Icon` (SVG DOM sur le web, `react-native-svg` sur natif).
 *
 *   ['p', d] chemin · ['c', cx, cy, r] cercle · ['r', x, y, w, h, rx] rectangle
 */
export type Shape =
  | ['p', string]
  | ['c', number, number, number]
  | ['r', number, number, number, number, number];

export type Glyph = {
  s: Shape[];
  /** Épaisseur de trait par défaut. */
  sw?: number;
  /** L'icône a une variante pleine (onglet actif de la barre de navigation). */
  fillable?: boolean;
};

export const ICONS = {
  home: { s: [['p', 'M3.5 10.5 12 3.5l8.5 7V20a.5.5 0 0 1-.5.5h-4.5v-6h-7v6H4a.5.5 0 0 1-.5-.5z']], fillable: true },
  list: { s: [['p', 'M4 7h16M4 12h16M4 17h10']] },
  target: { s: [['c', 12, 12, 8.5], ['c', 12, 12, 3.5]] },
  chart: { s: [['p', 'M5 19.5V11M12 19.5V4.5M19 19.5v-6']] },
  more: { s: [['c', 5, 12, 1.4], ['c', 12, 12, 1.4], ['c', 19, 12, 1.4]], fillable: true },
  plus: { s: [['p', 'M12 5.5v13M5.5 12h13']], sw: 2.2 },
  warn: { s: [['p', 'M12 4 2.8 20h18.4z'], ['p', 'M12 10v4.2M12 17.2h.01']] },
  chevronRight: { s: [['p', 'm9.5 5.5 6.5 6.5-6.5 6.5']], sw: 2 },
  chevronDown: { s: [['p', 'm6 9 6 6 6-6']], sw: 2.2 },
  back: { s: [['p', 'm14.5 5.5-6.5 6.5 6.5 6.5']] },
  repeat: { s: [['p', 'M4 9.5A5.5 5.5 0 0 1 9.5 4H20M20 9.5 16.5 6M20 14.5A5.5 5.5 0 0 1 14.5 20H4M4 14.5 7.5 18']] },
  filter: { s: [['p', 'M4 6h16l-6.2 7v6l-3.6-2.2V13z']], sw: 1.7 },
  wallet: { s: [['p', 'M3.5 7.5h15a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-15z'], ['p', 'M3.5 7.5v9M16.5 13h.01']] },
  cog: { s: [['c', 12, 12, 3], ['c', 12, 12, 8.5]] },
  mail: { s: [['r', 3, 5.5, 18, 13, 2], ['p', 'm3.8 7 8.2 6 8.2-6']] },
  check: { s: [['p', 'm5 12.5 4.5 4.5L19 7']], sw: 2.2 },
  calendar: { s: [['r', 3.5, 5.5, 17, 15, 2], ['p', 'M3.5 10h17M8 3.5v4M16 3.5v4']] },
  trendUp: { s: [['p', 'M12 19V6M6 11.5 12 5.5l6 6']], sw: 2.4 },
} as const satisfies Record<string, Glyph>;

export type IconName = keyof typeof ICONS;

export type IconProps = {
  name: IconName;
  color: string;
  size?: number;
  /** Variante pleine, utilisée par l'onglet actif de la barre de navigation. */
  filled?: boolean;
};

/** Attributs communs aux deux implémentations. */
export function glyphAttrs({ name, filled }: Pick<IconProps, 'name' | 'filled'>) {
  const glyph = ICONS[name] as Glyph;
  const solid = !!filled && !!glyph.fillable;
  return { shapes: glyph.s, solid, strokeWidth: (glyph.sw ?? 1.8) + (filled ? 0.8 : 0) };
}
