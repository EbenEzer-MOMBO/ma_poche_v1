/**
 * Données de démonstration du lot 1 — reprises telles quelles de la maquette.
 * Un seul module, pour que les écrans restent déclaratifs et qu'un branchement
 * au backend ne touche qu'ici.
 */

/** Le slot de couleur est assigné à la création de la catégorie, jamais recalculé (§2.4). */
export const CATEGORIES = [
  { label: 'Transport', slot: 0 },
  { label: 'Alimentation', slot: 1 },
  { label: 'Logement', slot: 2 },
  { label: 'Loisirs', slot: 3 },
  { label: 'Santé', slot: 4 },
  { label: 'Éducation', slot: 5 },
  { label: 'Abonnements', slot: 6 },
  { label: 'Divers', slot: 7 },
] as const;

export type Category = (typeof CATEGORIES)[number]['label'];

export type Account = { id: string; kind: string; name: string; balance: string };

export const ACCOUNTS: Account[] = [
  { id: 'bgfi', kind: 'Courant', name: 'BGFI', balance: '428 500' },
  { id: 'epargne', kind: 'Épargne', name: 'Somme Épargne', balance: '1 250 000' },
  { id: 'especes', kind: 'Espèces', name: 'Portefeuille', balance: '37 000' },
];

export type Project = { id: string; name: string; value: number; slot: number; caption: string };

export const PROJECTS: Project[] = [
  { id: 'pc', name: 'Ordinateur portable', value: 0.69, slot: 0, caption: '620 000 / 900 000 XAF · reste 280 000' },
  { id: 'urgence', name: "Fonds d'urgence", value: 0.3, slot: 2, caption: '300 000 / 1 000 000 XAF · reste 700 000' },
  { id: 'pog', name: 'Billet Port-Gentil', value: 0.57, slot: 3, caption: '85 000 / 150 000 XAF · reste 65 000' },
];

export type Transaction = {
  id: string;
  day: string;
  dayShort: string;
  name: string;
  category: string;
  /** Index dans la palette catégorielle (§2.4). */
  slot: number;
  account: string;
  amount: string;
  income?: boolean;
  recurring?: boolean;
};

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', day: "Aujourd'hui · 26 août", dayShort: "Aujourd'hui", name: 'Taxi Nombakélé', category: 'Transport', slot: 0, account: 'Espèces', amount: '−1 000' },
  { id: 't2', day: "Aujourd'hui · 26 août", dayShort: "Aujourd'hui", name: 'Marché Mont-Bouët', category: 'Alimentation', slot: 1, account: 'Espèces', amount: '−12 500' },
  { id: 't3', day: 'Hier · 25 août', dayShort: 'Hier', name: 'Pharmacie Glass', category: 'Santé', slot: 4, account: 'BGFI courant', amount: '−6 500' },
  { id: 't4', day: 'Hier · 25 août', dayShort: 'Hier', name: 'Canal+ Évasion', category: 'Abonnements', slot: 6, account: 'BGFI courant', amount: '−15 000', recurring: true },
  { id: 't5', day: '24 août', dayShort: '24 août', name: 'Mission freelance — refonte site', category: 'Revenu irrégulier', slot: 5, account: 'BGFI courant', amount: '+250 000', income: true },
  { id: 't6', day: '24 août', dayShort: '24 août', name: 'Carburant Total Owendo', category: 'Transport', slot: 0, account: 'BGFI courant', amount: '−20 000' },
  { id: 't7', day: '23 août', dayShort: '23 août', name: 'Forfait Airtel', category: 'Abonnements', slot: 6, account: 'BGFI courant', amount: '−10 000', recurring: true },
  { id: 't8', day: '23 août', dayShort: '23 août', name: 'Restaurant Le Phare', category: 'Alimentation', slot: 1, account: 'Espèces', amount: '−9 000' },
  { id: 't9', day: '1 août', dayShort: '1 août', name: 'Salaire', category: 'Revenu régulier', slot: 5, account: 'BGFI courant', amount: '+750 000', income: true, recurring: true },
];

/** Les 5 dernières opérations affichées sur l'accueil. */
export const RECENT = TRANSACTIONS.slice(0, 5);

export type Subscription = {
  id: string;
  name: string;
  amount: string;
  frequency: 'Mensuel' | 'Trimestriel' | 'Annuel';
  due: string;
  /** Renseigné uniquement sous 7 jours. */
  badge?: string;
};

export const SUBSCRIPTIONS: Subscription[] = [
  { id: 'canal', name: 'Canal+ Évasion', amount: '15 000', frequency: 'Mensuel', due: '29 août', badge: 'Dans 3 j' },
  { id: 'ogar', name: 'Assurance santé OGAR', amount: '25 000', frequency: 'Mensuel', due: '1 septembre', badge: 'Dans 6 j' },
  { id: 'airtel', name: 'Forfait Airtel', amount: '10 000', frequency: 'Mensuel', due: '2 septembre' },
  { id: 'netflix', name: 'Netflix', amount: '6 500', frequency: 'Mensuel', due: '5 septembre' },
  { id: 'spotify', name: 'Spotify', amount: '5 000', frequency: 'Mensuel', due: '12 septembre' },
  { id: 'kalikak', name: 'Salle de sport Kalikak', amount: '20 000', frequency: 'Mensuel', due: '15 septembre' },
];

export const USER = { firstName: 'Marc', initials: 'MN', email: 'nzeng.marc@gmail.com' };

export const BALANCE = { total: '1 715 500', delta: '+185 000 ce mois', today: 'Mercredi 26 août' };

export const NEXT_DUE = { title: 'Échéance dans 3 jours', body: 'Canal+ Évasion — 15 000 XAF le 29 août' };

/** Pavé numérique de l'ajout rapide. */
export const KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', '⌫'] as const;

/** Regroupe le registre par jour, en conservant l'ordre chronologique. */
export function groupByDay(rows: Transaction[]) {
  const groups: { day: string; rows: Transaction[] }[] = [];
  for (const row of rows) {
    const last = groups[groups.length - 1];
    if (last && last.day === row.day) last.rows.push(row);
    else groups.push({ day: row.day, rows: [row] });
  }
  return groups;
}
