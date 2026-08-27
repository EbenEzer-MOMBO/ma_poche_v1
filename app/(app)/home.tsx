import { router, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Brand, Radius, Space } from '@/constants/theme';
import { useIsDesktop } from '@/hooks/use-breakpoint';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { RecentRow } from '@/components/ui/rows';
import { Screen } from '@/components/ui/screen';
import { Section } from '@/components/ui/section';
import { StatTile } from '@/components/ui/stat';
import { Txt } from '@/components/ui/text';
import { Toast } from '@/components/ui/toast';
import { ACCOUNTS, BALANCE, NEXT_DUE, PROJECTS, RECENT, USER, type Account } from '@/data/somme';

export default function Home() {
  const { c } = useTheme();
  const desktop = useIsDesktop();
  const { saved } = useLocalSearchParams<{ saved?: string }>();
  const dismiss = useCallback(() => router.setParams({ saved: undefined }), []);

  /** Confirmation d'écriture : la vue ne revient qu'une fois le toast passé. */
  if (saved) return <SavedConfirmation detail={saved} onDismiss={dismiss} />;

  const balance = (
    <StatTile
      label="Solde total"
      value={BALANCE.total}
      delta={{ text: BALANCE.delta, tone: 'good' }}
    />
  );

  const projects = (
    <Card style={styles.stack}>
      {PROJECTS.map((project) => (
        <Progress
          key={project.id}
          name={project.name}
          value={project.value}
          color={c.chart[project.slot]}
          caption={project.caption}
        />
      ))}
    </Card>
  );

  const transactions = (
    <Card flush>
      {RECENT.map((tx, index) => (
        <RecentRow key={tx.id} tx={tx} last={index === RECENT.length - 1} />
      ))}
    </Card>
  );

  return (
    <Screen>
      {desktop ? (
        <>
          <View style={styles.desktopHead}>
            {balance}
            <DueAlert />
          </View>
          <View style={styles.accountGrid}>
            {ACCOUNTS.map((account) => (
              <AccountCard key={account.id} account={account} wide />
            ))}
          </View>
          <View style={styles.columns}>
            <Section title="Dernières transactions" onSeeAll={() => router.push('/transactions')} style={styles.main}>
              {transactions}
            </Section>
            <Section title="Projets" onSeeAll={() => router.push('/projects')} style={styles.aside}>
              {projects}
            </Section>
          </View>
        </>
      ) : (
        <>
          <View style={styles.greeting}>
            <View>
              <Txt size="sm" tone="soft">
                Bonjour {USER.firstName}
              </Txt>
              <Txt size="xs" tone="faint">
                {BALANCE.today}
              </Txt>
            </View>
            <Avatar initials={USER.initials} />
          </View>
          {balance}
          <DueAlert />
          <Section title="Comptes" onSeeAll={() => router.push('/accounts')}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.accountScroll}
              contentContainerStyle={styles.accountRow}>
              {ACCOUNTS.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </ScrollView>
          </Section>
          <Section title="Projets en cours" onSeeAll={() => router.push('/projects')}>
            {projects}
          </Section>
          <Section title="Dernières transactions" onSeeAll={() => router.push('/transactions')}>
            {transactions}
          </Section>
        </>
      )}
    </Screen>
  );
}

/** Écran 4.2 : accusé de réception de l'ajout rapide, toast au-dessus de la barre d'onglets. */
function SavedConfirmation({ detail, onDismiss }: { detail: string; onDismiss: () => void }) {
  return (
    <Screen centered contentStyle={styles.confirmation}>
      <View style={styles.confirmationBody}>
        <View style={[styles.confirmationIcon, { backgroundColor: Brand[100] }]}>
          <Icon name="check" size={26} color={Brand[700]} />
        </View>
        <Txt size="lg" weight={600}>
          Dépense enregistrée
        </Txt>
        <Txt size="sm" tone="soft" style={styles.center}>
          Nouveau solde du compte courant : 416 000 XAF
        </Txt>
      </View>
      <Toast
        message={detail}
        action={{ label: 'Annuler', onPress: onDismiss }}
        onDismiss={onDismiss}
      />
    </Screen>
  );
}

/** Alerte d'échéance : liseré warning + icône + libellé, jamais la couleur seule. */
function DueAlert() {
  const { c } = useTheme();
  return (
    <Card accent={c.warning} style={styles.alert}>
      <Icon name="warn" size={18} color={c.warning} />
      <View style={styles.alertText}>
        <Txt size="sm" weight={600}>
          {NEXT_DUE.title}
        </Txt>
        <Txt size="xs" tone="soft">
          {NEXT_DUE.body}
        </Txt>
      </View>
    </Card>
  );
}

function AccountCard({ account, wide }: { account: Account; wide?: boolean }) {
  return (
    <Card style={wide ? styles.accountWide : styles.account}>
      <Txt size="xs" tone="faint">
        {account.kind}
      </Txt>
      <Txt size="sm" weight={500}>
        {account.name}
      </Txt>
      <Txt size={wide ? '2xl' : 'lg'} weight={wide ? 700 : 600} tabular>
        {account.balance}
      </Txt>
    </Card>
  );
}

const styles = StyleSheet.create({
  greeting: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  alert: { flexDirection: 'row', gap: Space[3], paddingVertical: Space[3] },
  alertText: { flex: 1, minWidth: 0 },
  stack: { gap: Space[3] },
  account: { width: 150, gap: Space[1] },
  accountWide: { flex: 1, gap: Space[1], padding: Space[5] },
  accountRow: { gap: Space[3], paddingRight: Space[1] },
  /** Sans largeur explicite, le rail horizontal élargirait la colonne parente sur le web. */
  accountScroll: { width: '100%' },
  accountGrid: { flexDirection: 'row', gap: Space[4] },
  desktopHead: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: Space[6] },
  columns: { flexDirection: 'row', gap: Space[5], alignItems: 'flex-start' },
  main: { flex: 1.15 },
  aside: { flex: 0.85 },
  confirmation: { justifyContent: 'space-between', paddingVertical: Space[10] },
  confirmationBody: { alignItems: 'center', gap: Space[3], marginTop: Space[10] },
  confirmationIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { textAlign: 'center' },
});
