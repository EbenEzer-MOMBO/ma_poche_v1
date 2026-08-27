import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Brand, Radius, Space } from '@/constants/theme';
import { useIsDesktop } from '@/hooks/use-breakpoint';
import { AuthPanel, AuthSwitch } from '@/components/auth/panel';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Txt } from '@/components/ui/text';
import { USER } from '@/data/somme';

export default function SignIn() {
  const desktop = useIsDesktop();
  const [email, setEmail] = useState(USER.email);
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <AuthPanel
      footer={
        <AuthSwitch
          label="Pas encore de compte ?"
          action="Créer un compte"
          onPress={() => router.push('/sign-up')}
        />
      }>
      <View style={styles.intro}>
        <View style={styles.mark}>
          <Txt size="xl" weight={700} tone="onBrand">
            S
          </Txt>
        </View>
        <Txt size="xl" weight={600}>
          Content de vous revoir
        </Txt>
        <Txt size="sm" tone="soft">
          Connectez-vous pour retrouver vos comptes.
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
          placeholder="vous@exemple.ga"
        />
        <Field
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!visible}
          autoComplete="current-password"
          placeholder="••••••••"
          suffix={visible ? 'Masquer' : 'Afficher'}
          onSuffixPress={() => setVisible((v) => !v)}
        />
        <View style={styles.forgot}>
          <Txt size="sm" weight={500} tone="brand" onPress={() => router.push('/forgot-password')}>
            Mot de passe oublié ?
          </Txt>
        </View>
        <Button title="Se connecter" compact={desktop} onPress={() => router.replace('/')} />
      </View>
    </AuthPanel>
  );
}

const styles = StyleSheet.create({
  intro: { gap: Space[2] },
  mark: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Brand[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Space[2],
  },
  form: { gap: Space[4] },
  forgot: { alignItems: 'flex-end' },
});
