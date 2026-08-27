import { Link } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

export type NavLinkProps = {
  href: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  label?: string;
  selected?: boolean;
  role?: 'link' | 'tab' | 'button';
};

/**
 * Lien de navigation rendu comme une vraie ancre sur le web.
 *
 * `Link asChild` transmet le `style` de l'enfant jusqu'au `<a>` du DOM : une
 * *liste* de styles y arriverait telle quelle et casserait le rendu web. On
 * l'aplatit donc systématiquement ici, plutôt qu'à chaque appel.
 */
export function NavLink({ href, children, style, label, selected, role = 'link' }: NavLinkProps) {
  return (
    <Link href={href as never} asChild>
      <Pressable
        accessibilityRole={role}
        accessibilityLabel={label}
        accessibilityState={selected === undefined ? undefined : { selected }}
        style={StyleSheet.flatten(style)}>
        {children}
      </Pressable>
    </Link>
  );
}
