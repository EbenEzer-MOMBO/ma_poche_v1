import { Platform, Pressable, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';

import { Brand, Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Icon, type IconName } from '@/components/ui/icon';
import { Txt } from '@/components/ui/text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  variant?: ButtonVariant;
  icon?: IconName;
  /** 48px au mobile, 44px au desktop (design system §6). */
  compact?: boolean;
  block?: boolean;
  style?: ViewStyle;
};

export function Button({
  title,
  variant = 'primary',
  icon,
  compact,
  block,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const { c, shadow } = useTheme();
  const primary = variant === 'primary';
  const fg = primary ? '#fff' : variant === 'ghost' ? c.brandText : c.ink;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => [
        styles.base,
        { height: compact ? 44 : 48 },
        block && styles.block,
        primary && { backgroundColor: pressed || hovered ? Brand[600] : Brand[500], boxShadow: shadow.sm },
        variant === 'secondary' && {
          backgroundColor: pressed || hovered ? c.border : c.surfaceSoft,
          borderWidth: 1,
          borderColor: c.border,
        },
        disabled && styles.disabled,
        style,
      ]}
      {...rest}>
      {icon ? <Icon name={icon} color={fg} size={18} /> : null}
      <Txt size={compact ? 'sm' : 'base'} weight={600} color={fg}>
        {title}
      </Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space[2],
    paddingHorizontal: Space[6],
    borderRadius: Radius.md,
    ...Platform.select({ web: { cursor: 'pointer', transitionDuration: '120ms' } }),
  },
  block: { alignSelf: 'stretch' },
  disabled: { opacity: 0.4 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 36,
    paddingHorizontal: Space[3],
    borderRadius: Radius.full,
    backgroundColor: Brand[100],
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
});

/** Action secondaire compacte en pill (« Nouveau » en tête d'écran). */
export function PillButton({ title, icon, onPress }: { title: string; icon?: IconName; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.pill}>
      {icon ? <Icon name={icon} color={Brand[700]} size={14} /> : null}
      <Txt size="xs" weight={600} color={Brand[700]}>
        {title}
      </Txt>
    </Pressable>
  );
}
