import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Space } from '@/constants/theme';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { PillButton } from '@/components/ui/button';
import { SubscriptionRow } from '@/components/ui/rows';
import { Screen } from '@/components/ui/screen';
import { StatTile } from '@/components/ui/stat';
import { SUBSCRIPTIONS } from '@/data/somme';

export default function Subscriptions() {
  const subs = SUBSCRIPTIONS;

  if (subs.length === 0) {
    return (
      <Screen title="Abonnements" centered>
        <EmptyState
          icon="repeat"
          title="Aucun abonnement"
          body="Ajoutez Canal+, votre forfait ou votre assurance pour les voir arriver à l'avance."
          action={{ title: 'Ajouter un abonnement', onPress: () => router.push('/subscriptions/new') }}
        />
      </Screen>
    );
  }

  return (
    <Screen
      title="Abonnements"
      action={<PillButton title="Nouveau" icon="plus" onPress={() => router.push('/subscriptions/new')} />}>
      <Card style={styles.total}>
        <StatTile
          label="Total récurrent mensuel"
          value="81 500"
          size="2xl"
          caption={`${subs.length} abonnements actifs · 11 % de vos revenus mensuels`}
        />
      </Card>
      <View style={styles.list}>
        {subs.map((sub) => (
          <SubscriptionRow key={sub.id} sub={sub} onPress={() => router.push(`/subscriptions/${sub.id}`)} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  total: { padding: Space[5] },
  list: { gap: Space[2] },
});
