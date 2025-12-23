# Exercice Live Coding - Exercise Library avec filtres

**Durée estimée :** 45 minutes

## Contexte

Tu dois créer un composant `ExerciseTable` pour afficher une bibliothèque d'exercices de musculation avec des capacités de filtrage et tri. Pattern très courant dans les apps fitness.

## Requirements

### 1. Interface des données

```typescript
type Exercise = {
  id: string;
  name: string;
  muscleGroup: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';
  difficulty: number; // 1-5
  hasEquipment: boolean;
};
```

### 2. Features à implémenter

#### Filtres (cumulatifs)

- Par groupe musculaire (dropdown)
- Par équipement (checkbox "Avec équipement uniquement")
- Par recherche textuelle sur le nom (input)

#### Tri

- Par nom (A-Z / Z-A)
- Par difficulté (facile → difficile / difficile → facile)

#### Affichage

- Table avec colonnes : Nom, Groupe musculaire, Difficulté, Équipement
- Nombre de résultats affichés
- Message si aucun résultat

### 3. Signature du composant

```typescript
type ExerciseTableProps = {
  exercises: Exercise[];
};

function ExerciseTable({ exercises }: ExerciseTableProps) {
  // Ton code ici
}
```

## Données de test

```typescript
const MOCK_EXERCISES: Exercise[] = [
  { id: '1', name: 'Bench Press', muscleGroup: 'chest', difficulty: 3, hasEquipment: true },
  { id: '2', name: 'Push-ups', muscleGroup: 'chest', difficulty: 2, hasEquipment: false },
  { id: '3', name: 'Squats', muscleGroup: 'legs', difficulty: 3, hasEquipment: false },
  { id: '4', name: 'Leg Press', muscleGroup: 'legs', difficulty: 2, hasEquipment: true },
  { id: '5', name: 'Pull-ups', muscleGroup: 'back', difficulty: 4, hasEquipment: true },
  { id: '6', name: 'Deadlift', muscleGroup: 'back', difficulty: 5, hasEquipment: true },
  { id: '7', name: 'Shoulder Press', muscleGroup: 'shoulders', difficulty: 3, hasEquipment: true },
  { id: '8', name: 'Lateral Raises', muscleGroup: 'shoulders', difficulty: 2, hasEquipment: true },
  { id: '9', name: 'Bicep Curls', muscleGroup: 'arms', difficulty: 1, hasEquipment: true },
  { id: '10', name: 'Tricep Dips', muscleGroup: 'arms', difficulty: 3, hasEquipment: false },
  { id: '11', name: 'Plank', muscleGroup: 'core', difficulty: 2, hasEquipment: false },
  { id: '12', name: 'Russian Twists', muscleGroup: 'core', difficulty: 3, hasEquipment: false },
];
```

## Contraintes

- **React + TypeScript** (hooks, pas de class components)
- **Pas de lib externe** pour les filtres/tri (pas de `lodash`, `react-table`, etc.)
- **Types stricts** (pas de `any`)
- Le composant doit être **contrôlé** (state interne, pas de props pour les filtres)

## Bonus (si temps restant)

- Persistance des filtres dans l'URL (query params)
- Affichage des étoiles pour la difficulté (★★★☆☆)
- Highlight du texte recherché dans les résultats
- Badge pour le groupe musculaire avec couleur

## Ce qui sera évalué

1. **Architecture** : séparation logique filtres / tri / affichage
2. **TypeScript** : typage des states, des fonctions
3. **Performance** : éviter re-renders inutiles
4. **UX** : feedback utilisateur (messages, transitions)
5. **Code quality** : lisibilité, nommage, structure

## Exemple UI attendu

```
[Search: ________] [Muscle: All ▼] [☐ Avec équipement uniquement]
[Sort by: Name ▼]

┌──────────────────┬────────────┬────────────┬────────────┐
│ Nom              │ Muscle     │ Difficulté │ Équipement │
├──────────────────┼────────────┼────────────┼────────────┤
│ Bench Press      │ Chest      │ ★★★☆☆      │ ✓          │
│ Deadlift         │ Back       │ ★★★★★      │ ✓          │
│ Squats           │ Legs       │ ★★★☆☆      │ ✗          │
└──────────────────┴────────────┴────────────┴────────────┘

3 résultats affichés
```

## Notes

- Les filtres doivent être **cumulatifs** (tous les filtres actifs s'appliquent en même temps)
- Le tri s'applique **après** les filtres
- Pense à l'accessibilité (labels, aria-labels si nécessaire)
- Le code doit être prêt pour une review de code professionnelle
