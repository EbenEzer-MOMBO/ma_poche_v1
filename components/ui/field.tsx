import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { Brand, Radius, Space, Type, fontFamily, tabular } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Icon, type IconName } from '@/components/ui/icon';
import { Txt } from '@/components/ui/text';

type BaseProps = {
  label?: string;
  /** Message d'aide sous le champ — icône + libellé, jamais la couleur seule. */
  hint?: { text: string; tone: 'good' | 'critical' | 'faint'; icon?: IconName };
  style?: ViewStyle;
};

export type FieldProps = BaseProps &
  TextInputProps & {
    /** Suffixe inerte (« XAF ») ou action (« Afficher »). */
    suffix?: string;
    onSuffixPress?: () => void;
    amount?: boolean;
  };

/** Champ de saisie : 48px, `--radius-sm`, anneau de focus 2px décalé de 2px. */
export function Field({ label, hint, suffix, onSuffixPress, amount, style, ...input }: FieldProps) {
  const { c } = useTheme();
  const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.group, style]}>
      {label ? (
        <Txt size="xs" weight={500} tone="soft">
          {label}
        </Txt>
      ) : null}
      <View
        style={[
          styles.control,
          { backgroundColor: c.surface, borderColor: focused ? Brand[400] : c.border },
          focused && styles.focusRing,
        ]}>
        <TextInput
          placeholderTextColor={c.inkFaint}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.input, Type.base, { color: c.ink }, amount && tabular]}
          {...input}
        />
        {suffix ? (
          <Pressable onPress={onSuffixPress} disabled={!onSuffixPress} accessibilityRole={onSuffixPress ? 'button' : undefined}>
            <Txt size="xs" weight={600} tone={onSuffixPress ? 'brand' : 'soft'}>
              {suffix}
            </Txt>
          </Pressable>
        ) : null}
      </View>
      {hint ? (
        <View style={styles.hint}>
          {hint.icon ? <Icon name={hint.icon} size={14} color={c[hint.tone === 'faint' ? 'inkFaint' : hint.tone]} /> : null}
          <Txt size="xs" weight={500} tone={hint.tone === 'faint' ? 'faint' : hint.tone}>
            {hint.text}
          </Txt>
        </View>
      ) : null}
    </View>
  );
}

export type SelectFieldProps = BaseProps & {
  value: string;
  /** Pastille de catégorie (§2.4) affichée avant la valeur. */
  dot?: string;
  icon?: IconName;
  onPress?: () => void;
};

/** Même gabarit que `Field`, mais pour une valeur choisie ailleurs (compte, date, catégorie). */
export function SelectField({ label, value, dot, icon, onPress, style }: SelectFieldProps) {
  const { c } = useTheme();
  return (
    <View style={[styles.group, style]}>
      {label ? (
        <Txt size="xs" weight={500} tone="soft">
          {label}
        </Txt>
      ) : null}
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={[styles.control, { backgroundColor: c.surface, borderColor: c.border }]}>
        <View style={styles.value}>
          {dot ? <View style={[styles.dot, { backgroundColor: dot }]} /> : null}
          {icon ? <Icon name={icon} size={16} color={c.inkFaint} /> : null}
          <Txt size="sm">{value}</Txt>
        </View>
        <Icon name="chevronDown" size={14} color={c.inkFaint} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { gap: 6 },
  control: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Space[2],
    paddingHorizontal: Space[4],
    borderWidth: 1,
    borderRadius: Radius.sm,
  },
  focusRing: { outlineWidth: 2, outlineColor: Brand[400], outlineOffset: 2, outlineStyle: 'solid' },
  /** L'anneau de focus est porté par le conteneur : on retire celui du navigateur. */
  input: { flex: 1, fontFamily, paddingVertical: 0, outlineWidth: 0 },
  value: { flexDirection: 'row', alignItems: 'center', gap: Space[2], flex: 1 },
  dot: { width: 10, height: 10, borderRadius: Radius.full },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
