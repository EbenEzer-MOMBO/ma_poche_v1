# Somme

Application Expo (iOS · Android · Web) de suivi de comptes, projets et
abonnements. Ce dépôt implémente le **lot 1** des écrans : authentification,
accueil, dépenses & revenus, ajout rapide, abonnements.

## Démarrer

```bash
npm install
npx expo start        # natif + web en développement
npx expo export --platform web   # export statique du site
```

## Organisation

```
constants/theme.ts      Jetons du design system (couleurs, espacements, typo, ombres)
hooks/use-theme.ts      Palette et ombres du thème courant (clair/sombre à parité)
hooks/use-breakpoint.ts Bascule barre d'onglets ↔ barre latérale (1024px)
data/somme.ts           Données de démonstration du lot 1
components/ui/          Primitives du design system (Txt, Button, Card, Field, …)
components/nav/         Barre d'onglets + FAB, barre latérale desktop
components/auth/        Ossature des écrans d'authentification
app/                    Routes expo-router
```

Les écrans ne contiennent aucune valeur brute de couleur, d'espacement ou de
rayon : tout passe par `constants/theme.ts`, seule source des jetons.

### Routes

| Route | Écran de la maquette |
|---|---|
| `/sign-in`, `/sign-up`, `/forgot-password` | 1.1 – 1.4 |
| `/home` | 2.1 – 2.2, et 4.2 (confirmation, via `?saved=`) |
| `/transactions` | 3.1 – 3.3 |
| `/quick-add` | 4.1, 4.3 |
| `/subscriptions`, `/subscriptions/[id]` | 5.1 – 5.4 |

`/projects`, `/stats`, `/accounts` et `/settings` existent pour que la
navigation reste complète : ils affichent un état d'attente, leurs maquettes
appartenant à un lot ultérieur.

## Performance web

- **Une seule police**, chargée dans `app/+html.tsx` avec `preconnect` et
  `display=swap` — le texte s'affiche immédiatement en police système.
- **Icônes SVG inline.** Aucune police d'icônes. Sur le web, `Icon` rend un
  `<svg>` DOM (`icon.web.tsx`) : rendu statique identique côté serveur et
  client, et `react-native-svg` reste hors du bundle web.
- **Fond de page peint avant l'hydratation**, dans les deux thèmes, pour
  qu'aucun écran blanc ne clignote.
- **Styles statiques** (`StyleSheet.create`) et React Compiler activé : la
  mémoïsation des composants est prise en charge à la compilation.
- `prefers-reduced-motion` respecté.

### Contrainte web à connaître

`Link asChild` transmet le `style` de son enfant jusqu'à l'ancre du DOM : une
*liste* de styles y arriverait telle quelle et casserait le rendu. Tous les
liens passent donc par `components/ui/nav-link.tsx`, qui aplatit le style.
