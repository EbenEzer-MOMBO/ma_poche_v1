import { memo } from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { glyphAttrs, type IconProps } from '@/components/ui/icon-data';

export type { IconName, IconProps } from '@/components/ui/icon-data';

/** Implémentation native — `icon.web.tsx` rend du SVG DOM et n'embarque pas cette librairie. */
function IconBase({ name, color, size = 22, filled }: IconProps) {
  const { shapes, solid, strokeWidth } = glyphAttrs({ name, filled });
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round">
      {shapes.map((shape, i) =>
        shape[0] === 'p' ? (
          <Path key={i} d={shape[1]} />
        ) : shape[0] === 'c' ? (
          <Circle key={i} cx={shape[1]} cy={shape[2]} r={shape[3]} />
        ) : (
          <Rect key={i} x={shape[1]} y={shape[2]} width={shape[3]} height={shape[4]} rx={shape[5]} />
        )
      )}
    </Svg>
  );
}

export const Icon = memo(IconBase);
