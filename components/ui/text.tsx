import { StyleSheet, Text, type TextProps } from 'react-native';

import { Status, Type, fontFamily, tabular as tabularStyle } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TextTone = 'ink' | 'soft' | 'faint' | 'brand' | 'onBrand' | keyof typeof Status;
export type TextSize = keyof typeof Type;

export type TxtProps = TextProps & {
  size?: TextSize;
  weight?: 400 | 500 | 600 | 700;
  tone?: TextTone;
  /** Chiffres tabulaires — obligatoire pour tout montant. */
  tabular?: boolean;
  /** Libellé en petites majuscules discrètes (tuiles de statistique, sections). */
  caps?: boolean;
  color?: string;
};

/**
 * Seul composant de texte de l'app : il porte la famille, l'échelle et les
 * tons du design system, pour qu'aucun écran n'ait à répéter un style de texte.
 */
export function Txt({
  size = 'base',
  weight = 400,
  tone = 'ink',
  tabular,
  caps,
  color,
  style,
  ...rest
}: TxtProps) {
  const { c } = useTheme();
  const tones: Record<TextTone, string> = {
    ink: c.ink,
    soft: c.inkSoft,
    faint: c.inkFaint,
    brand: c.brandText,
    onBrand: '#fff',
    good: c.good,
    warning: c.warning,
    serious: c.serious,
    critical: c.critical,
  };
  return (
    <Text
      style={[
        styles.base,
        Type[size],
        { fontWeight: `${weight}`, color: color ?? tones[tone] },
        tabular && tabularStyle,
        caps && styles.caps,
        style,
      ]}
      {...rest}
    />
  );
}

/** Intitulé de section : `--text-xs`, majuscules discrètes, `--ink-faint`. */
export function Label({ style, ...rest }: TxtProps) {
  return <Txt size="xs" weight={500} tone="faint" caps style={style} {...rest} />;
}

const styles = StyleSheet.create({
  base: { fontFamily },
  caps: { textTransform: 'uppercase', letterSpacing: 0.5 },
});
