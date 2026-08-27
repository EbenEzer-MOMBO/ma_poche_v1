import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Space } from '@/constants/theme';
import { useIsDesktop } from '@/hooks/use-breakpoint';
import { AuthPanel, AuthSwitch } from '@/components/auth/panel';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Txt } from '@/components/ui/text';

const MIN_LENGTH = 8;

export default function SignUp() {
  const desktop = useIsDesktop();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const long = password.length >= MIN_LENGTH;

  return (
    <AuthPanel
      back
      footer={
        <AuthSwitch label="Déjà inscrit ?" action="Se connecter" onPress={() => router.replace('/sign-in')} />
      }>
      <View style={styles.intro}>
        <Txt size="xl" weight={600}>
          Créer un compte
        </Txt>
        <Txt size="sm" tone="soft">
          Trois champs, et vos comptes sont à vous.
        </Txt>
      </View>

      <View style={styles.form}>
        <Field label="Prénom" value={firstName} onChangeText={setFirstName} placeholder="Marc" autoComplete="given-name" />
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="vous@exemple.ga"
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
        />
        <Field
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!visible}
          autoComplete="new-password"
          suffix={visible ? 'Masquer' : 'Afficher'}
          onSuffixPress={() => setVisible((v) => !v)}
          hint={
            long
              ? { text: `${MIN_LENGTH} caractères minimum — c'est bon`, tone: 'good', icon: 'check' }
              : { text: `${MIN_LENGTH} caractères minimum`, tone: 'faint' }
          }
        />
        <Button title="Créer mon compte" compact={desktop} disabled={!long} onPress={() => router.replace('/')} />
        <Txt size="xs" tone="faint" style={styles.legal}>
          En continuant, vous acceptez les conditions d&apos;utilisation de Somme.
        </Txt>
      </View>
    </AuthPanel>
  );
}

const styles = StyleSheet.create({
  intro: { gap: Space[2] },
  form: { gap: Space[4] },
  legal: { textAlign: 'center' },
});
