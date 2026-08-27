import { router } from 'expo-router';

import { EmptyState } from '@/components/ui/empty-state';
import { Screen } from '@/components/ui/screen';

export default function NotFound() {
  return (
    <Screen centered>
      <EmptyState
        icon="warn"
        title="Page introuvable"
        body="Ce lien ne mène nulle part — revenez au tableau de bord."
        action={{ title: "Revenir à l'accueil", onPress: () => router.replace('/home') }}
      />
    </Screen>
  );
}
