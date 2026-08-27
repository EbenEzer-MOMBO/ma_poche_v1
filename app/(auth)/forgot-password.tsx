import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Brand, Radius, Space } from '@/constants/theme';
import { useIsDesktop } from '@/hooks/use-breakpoint';
import { useTheme } from '@/hooks/use-theme';
import { AuthPanel } from '@/components/auth/panel';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Icon } from '@/components/ui/icon';
import { Txt } from '@/components/ui/text';
import { USER } from '@/data/somme';

export default function ForgotPassword() {
  const { c } = useTheme();
  const desktop = useIsDesktop();
  const [email, setEmail] = useState(USER.email);

  return (
    <AuthPanel
      back
      footer={
        <View style={[styles.note, { backgroundColor: c.surfaceSoft, borderColor: c.border }]}>
          <Txt size="xs" tone="soft">
            Le lien expire après 30 minutes. Vérifiez vos indésirables si rien n&apos;arrive.
          </Txt>
        </View>
      }>
      <View style={[styles.icon, { backgroundColor: Brand[100] }]}>
        <Icon name="mail" size={24} color={Brand[700]} />
      </View>
      <View style={styles.intro}>
        <Txt size="xl" weight={600}>
          Mot de passe oublié
        </Txt>
        <Txt size="sm" tone="soft">
          Indiquez votre email : nous envoyons un lien pour en choisir un nouveau.
        </Txt>
      </View>
      <View style={styles.form}>
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
        />
        <Button title="Envoyer le lien" compact={desktop} />
        <Button title="Revenir à la connexion" variant="ghost" compact onPress={() => router.replace('/sign-in')} />
      </View>
    </AuthPanel>
  );
}

const styles = StyleSheet.create({
  icon: { width: 48, height: 48, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  intro: { gap: Space[2] },
  form: { gap: Space[4] },
  note: { padding: Space[4], borderWidth: 1, borderRadius: Radius.lg },
});
