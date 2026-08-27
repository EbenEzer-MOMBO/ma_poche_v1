import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, Radius, Space } from '@/constants/theme';
import { useIsDesktop } from '@/hooks/use-breakpoint';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Field, SelectField } from '@/components/ui/field';
import { Segmented } from '@/components/ui/segmented';
import { Label, Txt } from '@/components/ui/text';
import { CATEGORIES, KEYPAD } from '@/data/somme';

const KINDS = ['Dépense', 'Revenu'] as const;
const ACCOUNT = 'BGFI courant';

/**
 * Ajout rapide : feuille modale au mobile (montant, catégorie, enregistrer —
 * trois gestes), boîte de dialogue de 520px au desktop.
 */
export default function QuickAdd() {
  const { c, shadow } = useTheme();
  const desktop = useIsDesktop();
  const { bottom } = useSafeAreaInsets();

  const [kind, setKind] = useState<(typeof KINDS)[number]>('Dépense');
  const [amount, setAmount] = useState('12 500');
  const [category, setCategory] = useState<string>('Alimentation');
  const [note, setNote] = useState('');

  const close = () => router.back();

  // « Échap pour fermer » : le raccourci annoncé par l'écran desktop.
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && router.back();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const save = () =>
    router.replace({ pathname: '/home', params: { saved: `${amount} XAF · ${category}` } });

  const kindSelector = <Segmented options={KINDS} value={kind} onChange={setKind} height={desktop ? 34 : 36} />;

  const meta = (
    <View style={styles.metaRow}>
      <SelectField label={desktop ? 'Compte' : undefined} value={ACCOUNT} style={styles.metaItem} />
      <SelectField
        label={desktop ? 'Date' : undefined}
        value={desktop ? '26 août 2026' : "Aujourd'hui"}
        icon="calendar"
        style={styles.metaItem}
      />
    </View>
  );

  const noteField = (
    <Field
      label={desktop ? 'Note (facultatif)' : undefined}
      value={note}
      onChangeText={setNote}
      placeholder={desktop ? 'Courses de la semaine' : 'Note (facultatif)'}
    />
  );

  return (
    <View style={[styles.stage, desktop && styles.stageDesktop]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fermer"
        onPress={close}
        style={[styles.scrim, { backgroundColor: c.scrim }]}
      />

      {desktop ? (
        <View style={[styles.dialog, { backgroundColor: c.surface, boxShadow: shadow.lg }]}>
          <View style={styles.dialogHead}>
            <Txt size="lg" weight={600}>
              Ajout rapide
            </Txt>
            <Txt size="sm" weight={500} tone="soft">
              Échap pour fermer
            </Txt>
          </View>
          {kindSelector}
          <Field
            label="Montant"
            value={amount}
            onChangeText={setAmount}
            inputMode="numeric"
            amount
            suffix="XAF"
            autoFocus
          />
          <View style={styles.group}>
            <Txt size="xs" weight={500} tone="soft">
              Catégorie
            </Txt>
            <View style={styles.categoryPills}>
              {CATEGORIES.map((entry) => (
                <CategoryPill
                  key={entry.label}
                  label={entry.label}
                  color={c.chart[entry.slot]}
                  active={entry.label === category}
                  onPress={() => setCategory(entry.label)}
                />
              ))}
            </View>
          </View>
          {meta}
          {noteField}
          <View style={styles.dialogActions}>
            <Button title="Annuler" variant="secondary" compact onPress={close} />
            <Button title="Enregistrer" compact onPress={save} />
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.sheet,
            { backgroundColor: c.surface, boxShadow: shadow.lg, paddingBottom: Math.max(bottom, 20) },
          ]}>
          <View style={[styles.grabber, { backgroundColor: c.border }]} />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetBody}>
            {kindSelector}

            <View style={styles.amount}>
              <View style={styles.amountRow}>
                <Txt size="hero" weight={700} tabular>
                  {amount || '0'}
                </Txt>
                <Txt size="lg" weight={500} tone="soft">
                  XAF
                </Txt>
              </View>
              <Txt size="xs" tone="faint">
                {kind} sur {ACCOUNT}
              </Txt>
            </View>

            <View style={styles.group}>
              <Label>Catégorie</Label>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((entry) => (
                  <CategoryTile
                    key={entry.label}
                    label={entry.label}
                    color={c.chart[entry.slot]}
                    active={entry.label === category}
                    onPress={() => setCategory(entry.label)}
                  />
                ))}
              </View>
            </View>

            {meta}
            {noteField}

            <View style={styles.keypad}>
              {KEYPAD.map((key) => (
                <Pressable
                  key={key}
                  accessibilityRole="button"
                  onPress={() => setAmount((value) => press(value, key))}
                  style={[styles.key, { backgroundColor: c.surfaceSoft }]}>
                  <Txt size="xl" weight={600} tabular>
                    {key}
                  </Txt>
                </Pressable>
              ))}
            </View>

            <Button title={`Enregistrer la ${kind.toLowerCase()}`} block onPress={save} />
          </ScrollView>
        </View>
      )}
    </View>
  );
}

/** Applique une touche du pavé et reformate le montant par milliers. */
function press(value: string, key: string) {
  const digits = value.replace(/\D/g, '');
  const next = key === '⌫' ? digits.slice(0, -1) : `${digits}${key}`.slice(0, 12);
  return next ? Number(next).toLocaleString('fr-FR').replace(/ | /g, ' ') : '';
}

function CategoryTile({
  label,
  color,
  active,
  onPress,
}: {
  label: string;
  color: string;
  active: boolean;
  onPress: () => void;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[
        styles.tile,
        { backgroundColor: active ? Brand[100] : c.bg, borderColor: active ? Brand[200] : c.border },
      ]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Txt size="xs" weight={active ? 600 : 500} style={styles.tileLabel}>
        {label}
      </Txt>
    </Pressable>
  );
}

function CategoryPill({
  label,
  color,
  active,
  onPress,
}: {
  label: string;
  color: string;
  active: boolean;
  onPress: () => void;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[
        styles.pill,
        { backgroundColor: active ? Brand[100] : c.bg, borderColor: active ? Brand[200] : c.border },
      ]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Txt size="sm" weight={active ? 600 : 500}>
        {label}
      </Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  stage: { flex: 1, justifyContent: 'flex-end' },
  stageDesktop: { alignItems: 'center', justifyContent: 'center', padding: Space[6] },
  scrim: { ...StyleSheet.absoluteFillObject },
  sheet: {
    maxHeight: '92%',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: Space[3],
    paddingHorizontal: Space[4],
  },
  sheetBody: { gap: Space[4], paddingBottom: Space[2] },
  grabber: { width: 36, height: 4, borderRadius: Radius.full, alignSelf: 'center', marginBottom: Space[3] },
  dialog: { width: 520, maxWidth: '100%', gap: Space[5], padding: Space[6], borderRadius: Radius.xl },
  dialogHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dialogActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: Space[3] },
  amount: { alignItems: 'center', gap: 2, paddingVertical: Space[2] },
  amountRow: { flexDirection: 'row', alignItems: 'baseline', gap: Space[2] },
  group: { gap: Space[2] },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Space[2] },
  categoryPills: { flexDirection: 'row', flexWrap: 'wrap', gap: Space[2] },
  tile: {
    /* Quatre colonnes : 4 × 22 % tiennent, 5 débordent et passent à la ligne. */
    flexGrow: 1,
    flexBasis: '22%',
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: Space[2],
    paddingHorizontal: Space[1],
    borderWidth: 1,
    borderRadius: Radius.sm,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  tileLabel: { textAlign: 'center' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space[2],
    height: 36,
    paddingHorizontal: Space[4],
    borderWidth: 1,
    borderRadius: Radius.full,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  dot: { width: 10, height: 10, borderRadius: Radius.full },
  metaRow: { flexDirection: 'row', gap: Space[2] },
  metaItem: { flex: 1 },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', gap: Space[2] },
  key: {
    /* Trois colonnes, même principe. */
    flexGrow: 1,
    flexBasis: '30%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.sm,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
});
