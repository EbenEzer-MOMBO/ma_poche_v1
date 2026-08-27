import { EmptyState } from '@/components/ui/empty-state';
import { Screen } from '@/components/ui/screen';
import type { IconName } from '@/components/ui/icon';

/** Écrans prévus dans un lot ultérieur : la navigation reste honnête, sans maquette inventée. */
export function ComingSoon({ title, icon, body }: { title: string; icon: IconName; body: string }) {
  return (
    <Screen title={title} centered>
      <EmptyState icon={icon} title={`${title} — bientôt`} body={body} />
    </Screen>
  );
}
