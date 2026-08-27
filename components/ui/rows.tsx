import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { CategoryChip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';
import { Txt } from '@/components/ui/text';
import type { Subscription, Transaction } from '@/data/somme';

/** Ligne compacte de l'accueil : pastille de catégorie, libellé, méta, montant. */
export function RecentRow({ tx, last }: { tx: Transaction; last?: boolean }) {
  const { c } = useTheme();
  return (
    <View style={[styles.recent, !last && { borderBottomWidth: 1, borderBottomColor: c.border }]}>
      <View style={[styles.dot, { backgroundColor: c.chart[tx.slot] }]} />
      <View style={styles.grow}>
        <Txt size="sm" weight={500} numberOfLines={1}>
          {tx.name}
        </Txt>
        <Txt size="xs" tone="faint" numberOfLines={1}>
          {tx.category} · {tx.dayShort}
        </Txt>
      </View>
      <Amount tx={tx} />
    </View>
  );
}

/** Ligne détaillée du registre : chip de catégorie, compte, marqueur récurrent. */
export function LedgerRow({ tx, onPress }: { tx: Transaction; onPress?: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
      <View style={styles.grow}>
        <Txt size="sm" weight={500} numberOfLines={1}>
          {tx.name}
        </Txt>
        <View style={styles.meta}>
          <CategoryChip label={tx.category} color={c.chart[tx.slot]} />
          <Txt size="xs" tone="faint">
            {tx.account}
          </Txt>
          {tx.recurring ? <Icon name="repeat" size={13} color={c.inkFaint} /> : null}
        </View>
      </View>
      <Amount tx={tx} />
    </Pressable>
  );
}

/** Ligne d'abonnement : prochaine échéance, badge « dans N j » sous 7 jours. */
export function SubscriptionRow({ sub, onPress }: { sub: Subscription; onPress?: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
      <View style={styles.grow}>
        <Txt size="sm" weight={500} numberOfLines={1}>
          {sub.name}
        </Txt>
        <View style={styles.meta}>
          <Txt size="xs" tone="faint">
            {sub.due}
          </Txt>
          {sub.badge ? <Badge label={sub.badge} /> : null}
        </View>
      </View>
      <View style={styles.trailing}>
        <Txt size="sm" weight={600} tabular>
          {sub.amount}
        </Txt>
        <Txt size="xs" tone="faint">
          {sub.frequency}
        </Txt>
      </View>
      <Icon name="chevronRight" size={16} color={c.inkFaint} />
    </Pressable>
  );
}

function Amount({ tx }: { tx: Transaction }) {
  return (
    <Txt size="sm" weight={600} tone={tx.income ? 'good' : 'ink'} tabular>
      {tx.amount}
    </Txt>
  );
}

const styles = StyleSheet.create({
  recent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space[3],
    paddingVertical: Space[3],
    paddingHorizontal: Space[4],
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space[3],
    paddingVertical: Space[3],
    paddingHorizontal: Space[4],
    borderWidth: 1,
    borderRadius: Radius.lg,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  grow: { flex: 1, gap: 5, minWidth: 0 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: Space[2] },
  trailing: { alignItems: 'flex-end', gap: 2 },
  dot: { width: 10, height: 10, borderRadius: Radius.full },
});
