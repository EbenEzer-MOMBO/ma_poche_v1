import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

/**
 * Coquille HTML du rendu web statique (`web.output: "static"`).
 * Trois choix de performance, conformes au design system §7 :
 *   1. une seule famille variable, en `preconnect` + `display=swap`, pour que
 *      le texte s'affiche immédiatement en police système puis bascule ;
 *   2. le fond de page peint avant l'hydratation, dans les deux thèmes, pour
 *      qu'aucun écran blanc ne clignote au chargement ;
 *   3. aucune autre ressource externe — les icônes sont des SVG inline.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#7c4dee" />
        <meta name="color-scheme" content="light dark" />
        <meta name="description" content="Somme — vos comptes, vos projets, vos abonnements." />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />

        {/* Neutralise le défilement du body pour laisser les ScrollView le gérer. */}
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: BASE_CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const BASE_CSS = `
:root { color-scheme: light dark; }
body { background-color: #faf9fc; overscroll-behavior-y: none; }
@media (prefers-color-scheme: dark) { body { background-color: #0e0c14; } }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;
