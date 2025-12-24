# Exercice Live Coding - Mission Dashboard

> Durée estimée : 45-60min

## Contexte

Tu travailles sur une plateforme de staffing pour l'hôtellerie-restauration. Les établissements doivent pouvoir visualiser leurs missions à venir avec les détails associés.

## Setup initial

```bash
npx create-react-app mission-dashboard --template typescript
cd mission-dashboard
npm start
```

## Données de test

```typescript
type Mission = {
  id: number;
  job: string;
  pricePerHour: number;
  durationInMinutes: number;
};

const MOCK_MISSIONS: Mission[] = [
  {
    id: 1,
    job: "Commis de cuisine",
    pricePerHour: 20,
    durationInMinutes: 240,
  },
  {
    id: 2,
    job: "Plongeur",
    pricePerHour: 18,
    durationInMinutes: 270,
  },
  {
    id: 3,
    job: "Chef pâtissier",
    pricePerHour: 21,
    durationInMinutes: 195,
  },
];
```

---

## Exercice 1 : Liste de missions (20-25min)

### Requirements

Afficher une liste de cartes avec les informations suivantes :

**Pour chaque mission :**

- Nom du poste (`job`)
- Durée formatée en heures (ex: `240min` → `4h`, `270min` → `4h30`)
- Prix total de la mission (`pricePerHour * durationInMinutes / 60`)

### Exemple de rendu attendu

```
┌─────────────────────────────┐
│ Commis de cuisine           │
│ 4h                          │
│ 80€                         │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Plongeur                    │
│ 4h30                        │
│ 81€                         │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Chef pâtissier              │
│ 3h15                        │
│ 68.25€                      │
└─────────────────────────────┘
```

### Contraintes

- **React + TypeScript**
- Typage strict de `Mission`
- Fonction `formatDuration(minutes: number): string` pour le format d'affichage
- Fonction `calculateTotal(mission: Mission): number` pour le prix total

---

## Exercice 2 : Toggle collapse/expand (20-25min)

### Requirements

Ajouter un système de collapse/expand pour afficher plus de détails à la demande.

**État par défaut (collapsed) :**

- Afficher uniquement le nom du poste
- Bouton `[+]` visible

**État expanded (au clic sur `[+]`) :**

- Afficher toutes les infos (durée, prix total)
- Afficher les détails supplémentaires :
  - Tarif horaire (`20€/h`)
  - Durée en minutes (`240 minutes`)
- Bouton devient `[-]`

### Exemple de rendu attendu

**Collapsed (défaut) :**

```
┌─────────────────────────────┐
│ Commis de cuisine      [+]  │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Plongeur               [+]  │
└─────────────────────────────┘
```

**Expanded (après clic) :**

```
┌─────────────────────────────┐
│ Commis de cuisine      [-]  │
│                             │
│ Durée: 4h (240 minutes)     │
│ Tarif: 20€/h                │
│ Prix total: 80€             │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Plongeur               [+]  │
└─────────────────────────────┘
```

### Contraintes

- State indépendant pour chaque carte
- Animation optionnelle (bonus)
- Accessibilité : bouton avec `aria-label` approprié

---

## Bonus (si temps restant)

### Niveau 1

- Filter par type de poste (dropdown)
- Tri par prix (croissant/décroissant)

### Niveau 2

- Search bar pour filtrer par nom de poste
- Affichage du nombre total de missions et prix cumulé

### Niveau 3

- Toggle global "Tout expand / Tout collapse"
- Persistance de l'état expanded dans `localStorage`

---

## Ce qui sera évalué

| Critère              | Description                                  |
| -------------------- | -------------------------------------------- |
| **TypeScript**       | Typage strict, pas de `any`                  |
| **Architecture**     | Composants réutilisables, séparation logique |
| **Formatage**        | Précision des calculs et formats d'affichage |
| **State management** | Gestion propre du state collapse/expand      |
| **Communication**    | Explication à voix haute de tes choix        |

---

## Guidelines pendant l'exercice

### ✅ À faire

- Expliquer tes intentions avant de coder
- Utiliser Google si besoin (en partageant ton écran)
- Prendre le temps nécessaire
- Arrêter quand tu estimes avoir terminé

### ✅ Demandes de clarification autorisées

- Format exact du prix (arrondi ? décimales ?)
- Style CSS attendu (minimal OK)
- Structure de composants préférée

---

**Prêt ? Lance ton timer et partage ton écran ! 🚀**
