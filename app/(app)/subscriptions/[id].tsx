import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Radius, Space } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Field, SelectField } from '@/components/ui/field';
import { Segmented } from '@/components/ui/segmented';
import { Screen } from '@/components/ui/screen';
import { Txt } from '@/components/ui/text';
import { Toggle } from '@/components/ui/toggle';
import { CATEGORIES, SUBSCRIPTIONS, type Subscription } from '@/data/somme';

const FREQUENCIES = ['Mensuel', 'Trimestriel', 'Annuel'] as const;

const BLANK: Subscription = { id: 'new', name: '', amount: '', frequency: 'Mensuel', due: '' };

/**
 * Même écran pour créer et modifier : en création, « Supprimer » disparaît et
 * le CTA devient « Ajouter l'abonnement ».
 */
export default function EditSubscription() {
  const { c } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const existing = SUBSCRIPTIONS.find((sub) => sub.id === id);
  const source = existing ?? BLANK;

  const [name, setName] = useState(source.name);
  const [amount, setAmount] = useState(source.amount);
  const [frequency, setFrequency] = useState<Subscription['frequency']>(source.frequency);
  const [notify, setNotify] = useState(true);

  const category = CATEGORIES.find((entry) => entry.label === 'Abonnements')!;

  return (
    <Screen
      back
      navAction={
        existing ? (
          <Pressable accessibilityRole="button" onPress={() => router.back()}>
            <Txt size="sm" weight={600} tone="critical">
              Supprimer
            </Txt>
          </Pressable>
        ) : null
      }
      title={existing ? "Modifier l'abonnement" : 'Nouvel abonnement'}
      footer={
        <Button
          title={existing ? 'Enregistrer' : "Ajouter l'abonnement"}
          block
          onPress={() => router.back()}
        />
      }
      contentStyle={styles.content}>
      <Field label="Nom" value={name} onChangeText={setName} placeholder="Canal+ Évasion" />
      <Field
        label="Montant"
        value={amount}
        onChangeText={setAmount}
        placeholder="15 000"
        inputMode="numeric"
        amount
        suffix="XAF"
      />
      <View style={styles.group}>
        <Txt size="xs" weight={500} tone="soft">
          Fréquence
        </Txt>
        <Segmented options={FREQUENCIES} value={frequency} onChange={setFrequency} height={40} />
      </View>
      <SelectField label="Prochaine échéance" value={source.due || "Aujourd'hui"} icon="calendar" />
      <SelectField label="Compte débité" value="Compte courant BGFI" />
      <SelectField label="Catégorie" value={category.label} dot={c.chart[category.slot]} />

      <View style={[styles.notify, { backgroundColor: c.surface, borderColor: c.border }]}>
        <View style={styles.notifyText}>
          <Txt size="sm" weight={500}>
            Me prévenir 3 jours avant
          </Txt>
          <Txt size="xs" tone="faint">
            Badge sur l&apos;accueil
          </Txt>
        </View>
        <Toggle value={notify} onChange={setNotify} label="Me prévenir 3 jours avant" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Space[4], maxWidth: 560 },
  group: { gap: Space[2] },
  notify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Space[3],
    paddingVertical: Space[3],
    paddingHorizontal: Space[4],
    borderWidth: 1,
    borderRadius: Radius.lg,
  },
  notifyText: { flex: 1, minWidth: 0 },
});
