import { Redirect } from 'expo-router';

/** Point d'entrée : l'authentification précède l'app. */
export default function Index() {
  return <Redirect href="/sign-in" />;
}
