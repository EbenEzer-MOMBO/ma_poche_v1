import { StyleSheet, View } from 'react-native';

import { Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { CategoryChip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';
import { Label, Txt } from '@/components/ui/text';
import type { Transaction } from '@/data/somme';

const COLUMNS = [
  { key: 'date', label: 'Date', width: 100 },
  { key: 'name', label: 'Libellé', flex: 1 },
  { key: 'category', label: 'Catégorie', width: 180 },
  { key: 'account', label: 'Compte', width: 130 },
  { key: 'amount', label: 'Montant', width: 120, right: true },
] as const;

/** Version desktop du registre : les cartes empilées deviennent des lignes de tableau. */
export function LedgerTable({ rows }: { rows: Transaction[] }) {
  const { c, shadow } = useTheme();
  return (
    <View style={[styles.table, { backgroundColor: c.surface, borderColor: c.border, boxShadow: shadow.sm }]}>
      <View style={[styles.row, { backgroundColor: c.surfaceSoft }]}>
        {COLUMNS.map((column) => (
          <Label key={column.key} style={cell(column)}>
            {column.label}
          </Label>
        ))}
      </View>
      {rows.map((tx) => (
        <View key={tx.id} style={[styles.row, { borderTopWidth: 1, borderTopColor: c.border }]}>
          <Txt size="sm" tone="soft" tabular style={cell(COLUMNS[0])}>
            {tx.dayShort}
          </Txt>
          <View style={[styles.name, cell(COLUMNS[1])]}>
            <Txt size="sm" weight={500} numberOfLines={1}>
              {tx.name}
            </Txt>
            {tx.recurring ? <Icon name="repeat" size={13} color={c.inkFaint} /> : null}
          </View>
          <View style={[styles.start, cell(COLUMNS[2])]}>
            <CategoryChip label={tx.category} color={c.chart[tx.slot]} />
          </View>
          <Txt size="sm" tone="soft" numberOfLines={1} style={cell(COLUMNS[3])}>
            {tx.account}
          </Txt>
          <Txt size="sm" weight={600} tone={tx.income ? 'good' : 'ink'} tabular style={cell(COLUMNS[4])}>
            {tx.amount}
          </Txt>
        </View>
      ))}
    </View>
  );
}

function cell(column: (typeof COLUMNS)[number]) {
  return {
    width: 'width' in column ? column.width : undefined,
    flex: 'flex' in column ? column.flex : undefined,
    textAlign: 'right' in column && column.right ? ('right' as const) : undefined,
  };
}

const styles = StyleSheet.create({
  table: { borderWidth: 1, borderRadius: Radius.lg, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space[4],
    paddingVertical: Space[3],
    paddingHorizontal: Space[5],
  },
  name: { flexDirection: 'row', alignItems: 'center', gap: Space[2], minWidth: 0 },
  start: { alignItems: 'flex-start' },
});
