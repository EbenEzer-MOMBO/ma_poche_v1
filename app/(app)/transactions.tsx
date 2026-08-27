import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Brand, Radius, Space } from '@/constants/theme';
import { useIsDesktop } from '@/hooks/use-breakpoint';
import { useTheme } from '@/hooks/use-theme';
import { FilterChip } from '@/components/ui/chip';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@/components/ui/icon';
import { LedgerTable } from '@/components/ui/ledger-table';
import { LedgerRow } from '@/components/ui/rows';
import { Screen } from '@/components/ui/screen';
import { Label, Txt } from '@/components/ui/text';
import { TRANSACTIONS, groupByDay } from '@/data/somme';

const TYPES = ['Tout', 'Dépenses', 'Revenus'] as const;
type Type = (typeof TYPES)[number];

export default function Transactions() {
  const desktop = useIsDesktop();
  const [type, setType] = useState<Type>('Tout');
  const [category, setCategory] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      TRANSACTIONS.filter(
        (tx) =>
          (type === 'Tout' || (type === 'Revenus') === !!tx.income) &&
          (!category || tx.category === category)
      ),
    [type, category]
  );

  const filters = (
    <View style={desktop ? styles.filterRowDesktop : undefined}>
      <Segment value={type} onChange={setType} desktop={desktop} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        style={desktop ? styles.chipsDesktop : styles.chipsMobile}>
        <FilterChip label="Tous les comptes" />
        <FilterChip
          label="Alimentation"
          active={category === 'Alimentation'}
          onPress={() => setCategory((value) => (value ? null : 'Alimentation'))}
        />
        <FilterChip label="Août 2026" />
        <FilterChip label="Trier" />
      </ScrollView>
    </View>
  );

  return (
    <Screen
      title="Dépenses & revenus"
      action={desktop ? <Summary count={rows.length} /> : <FilterButton active={!!category} />}
      sticky={
        <>
          {filters}
          {!desktop ? (
            <View style={styles.summary}>
              <Txt size="xs" tone="faint">
                Août 2026 · {rows.length} opérations
              </Txt>
              <Txt size="sm" weight={600} tabular>
                −318 400 XAF
              </Txt>
            </View>
          ) : null}
        </>
      }
      centered={rows.length === 0}>
      {rows.length === 0 ? (
        <EmptyState
          icon="list"
          title="Aucune opération"
          body="Une mission, une vente, un remboursement : ajoutez-le quand il tombe."
          action={{ title: 'Ajouter une opération', onPress: () => router.push('/quick-add') }}
        />
      ) : desktop ? (
        <LedgerTable rows={rows} />
      ) : (
        groupByDay(rows).map((group) => (
          <View key={group.day} style={styles.group}>
            <Label>{group.day}</Label>
            {group.rows.map((tx) => (
              <LedgerRow key={tx.id} tx={tx} />
            ))}
          </View>
        ))
      )}
    </Screen>
  );
}

/** Segment de type : pleine largeur au mobile, largeur du contenu au desktop. */
function Segment({
  value,
  onChange,
  desktop,
}: {
  value: Type;
  onChange: (value: Type) => void;
  desktop: boolean;
}) {
  const { c, shadow } = useTheme();
  return (
    <View style={[styles.track, { backgroundColor: c.surfaceSoft }, !desktop && styles.trackBlock]}>
      {TYPES.map((option) => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option)}
            style={[
              styles.segment,
              desktop ? styles.segmentDesktop : styles.segmentMobile,
              active && { backgroundColor: c.surface, boxShadow: shadow.sm },
            ]}>
            <Txt size={desktop ? 'sm' : 'xs'} weight={600} tone={active ? 'ink' : 'soft'}>
              {option}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

function Summary({ count }: { count: number }) {
  return (
    <Txt size="sm" tone="soft" tabular>
      Août 2026 · {count} opérations ·{' '}
      <Txt size="sm" weight={600} tabular>
        −318 400 XAF
      </Txt>
    </Txt>
  );
}

function FilterButton({ active }: { active: boolean }) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Filtres"
      style={[
        styles.filterButton,
        {
          backgroundColor: active ? Brand[100] : c.surface,
          borderColor: active ? Brand[200] : c.border,
        },
      ]}>
      <Icon name="filter" size={18} color={active ? Brand[700] : c.inkSoft} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filterRowDesktop: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: Space[3] },
  track: { flexDirection: 'row', gap: Space[1], padding: Space[1], borderRadius: Radius.md },
  trackBlock: { alignSelf: 'stretch' },
  segment: { alignItems: 'center', justifyContent: 'center', borderRadius: Radius.sm, ...Platform.select({ web: { cursor: 'pointer' } }) },
  segmentMobile: { flex: 1, height: 36 },
  segmentDesktop: { height: 34, paddingHorizontal: Space[4] },
  chips: { gap: Space[2], paddingRight: Space[1] },
  /** Sans largeur explicite, le rail de chips élargirait l'écran sur le web. */
  chipsMobile: { marginTop: Space[3], width: '100%' },
  chipsDesktop: { flexGrow: 0, flexShrink: 1 },
  summary: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  group: { gap: Space[2] },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: Radius.full,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
});
