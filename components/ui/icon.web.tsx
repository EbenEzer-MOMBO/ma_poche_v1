import { memo } from 'react';

import { glyphAttrs, type IconProps } from '@/components/ui/icon-data';

export type { IconName, IconProps } from '@/components/ui/icon-data';

/**
 * Sur le web, l'icône est un `<svg>` DOM : rendu statique identique côté
 * serveur et côté client (pas de désynchronisation à l'hydratation), et
 * `react-native-svg` n'entre jamais dans le bundle web.
 */
function IconBase({ name, color, size = 22, filled }: IconProps) {
  const { shapes, solid, strokeWidth } = glyphAttrs({ name, filled });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0, display: 'block' }}>
      {shapes.map((shape, i) =>
        shape[0] === 'p' ? (
          <path key={i} d={shape[1]} />
        ) : shape[0] === 'c' ? (
          <circle key={i} cx={shape[1]} cy={shape[2]} r={shape[3]} />
        ) : (
          <rect key={i} x={shape[1]} y={shape[2]} width={shape[3]} height={shape[4]} rx={shape[5]} />
        )
      )}
    </svg>
  );
}

export const Icon = memo(IconBase);
