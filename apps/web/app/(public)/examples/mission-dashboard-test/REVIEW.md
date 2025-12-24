# Code Review - Mission Dashboard

> **Durée** : 45 minutes | **Durée estimée** : 45-60 min ✅

## ✅ Points Forts

**Architecture & Organisation**

- ✅ Bonne séparation des responsabilités : `page.tsx`, `components/`, `utils/`, `data.ts`
- ✅ Composant `CardMission` isolé et réutilisable
- ✅ Fonctions utilitaires extraites dans `utils/lib.ts`
- ✅ Données mock séparées dans `data.ts`

**TypeScript**

- ✅ Type `Mission` correctement défini avec typage strict
- ✅ Interface `FormatDurationParams` pour les paramètres de fonction
- ✅ Types de retour explicites sur les fonctions (`string`, `number`)
- ✅ Pas de `any` dans le code

**Fonctionnalités**

- ✅ Exercice 1 complété : liste de missions avec formatage
- ✅ Exercice 2 complété : toggle collapse/expand fonctionnel
- ✅ Bonus Niveau 2 : affichage du total missions et prix cumulé
- ✅ Accessibilité : `aria-label` sur le bouton toggle

---

## ⚠️ Problèmes Mineurs

### 1. **Import circulaire potentiel** (Priorité Moyenne)

**Problème** : Le type `Mission` est exporté depuis `page.tsx` et importé dans `data.ts` et `utils/lib.ts`, créant une dépendance circulaire potentielle.

```typescript
// data.ts
import { Mission } from "./page";

// utils/lib.ts
import { Mission } from "../page";
```

**Solution recommandée** : Extraire le type dans un fichier dédié `types.ts`

```typescript
// types.ts
export type Mission = {
  id: number;
  job: string;
  pricePerHour: number;
  durationInMinutes: number;
};
```

```typescript
// page.tsx, data.ts, utils/lib.ts
import { Mission } from "./types";
```

**Impact** : Meilleure organisation, évite les problèmes de build potentiels

---

### 2. **Typage incomplet sur certaines fonctions** (Lignes 24-26)

```typescript
// Avant
export const getTotalMissions = (missions: Mission[]) => {
  return missions.length;
};
```

```typescript
// Après - avec type de retour explicite
export const getTotalMissions = (missions: Mission[]): number => {
  return missions.length;
};
```

---

## 🔧 Améliorations Recommandées

### 3. **Nommage des fonctions** (utils/lib.ts)

Les noms de fonctions pourraient être plus cohérents avec les contraintes du test.

**Avant** :

```typescript
export const getFormatedDuration = ({ minutes }: FormatDurationParams) => { ... }
export const getFormatedPrice = (mission: Mission): string => { ... }
```

**Après** (selon les contraintes du test) :

```typescript
export const formatDuration = (minutes: number): string => { ... }
export const calculateTotal = (mission: Mission): number => { ... }
```

**Note** : "Formated" → "Formatted" (faute d'orthographe anglaise)

---

### 4. **Simplification de `getFormatedDuration`** (Lignes 7-13)

L'interface `FormatDurationParams` est superflue pour un seul paramètre.

**Avant** :

```typescript
interface FormatDurationParams {
  minutes: number;
}

export const getFormatedDuration = ({ minutes }: FormatDurationParams) => {
  const getHours = Math.floor(minutes / 60);
  const getMinutes = minutes % 60;
  // ...
};
```

**Après** :

```typescript
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) return `${hours}h`;
  return `${hours}h${mins}`;
};
```

**Impact** : Code plus simple, signature de fonction conforme au test

---

### 5. **Amélioration du composant CardMission** (components/CardMission.tsx)

**Suggestion** : Ajouter une transition CSS pour le collapse/expand

```tsx
// Ajouter une animation de transition
<div
  className={`overflow-hidden transition-all duration-200 ${
    isOpen ? "max-h-40" : "max-h-0"
  }`}
>
  <ul className="pt-2 space-y-1">...</ul>
</div>
```

**Note** : L'utilisation de Tailwind CSS pur est parfaitement adaptée pour un test technique - c'est rapide et efficace.

---

## Améliorations Bonus (Non implémentées)

### Niveau 1 - Filtres et tri

```typescript
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

const sortedMissions = [...missions].sort((a, b) => {
  const priceA = calculateMissionPrice(a);
  const priceB = calculateMissionPrice(b);
  return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
});
```

### Niveau 3 - Toggle global

```typescript
const [allExpanded, setAllExpanded] = useState(false);

// Dans le parent
<Button onClick={() => setAllExpanded(!allExpanded)}>
  {allExpanded ? "Tout réduire" : "Tout développer"}
</Button>

// Passer l'état au composant enfant
<CardMission mission={mission} forceOpen={allExpanded} />
```

### Niveau 3 - Persistance localStorage

```typescript
const [expandedIds, setExpandedIds] = useState<number[]>(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("expandedMissions");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
});

useEffect(() => {
  localStorage.setItem("expandedMissions", JSON.stringify(expandedIds));
}, [expandedIds]);
```

---

## 📊 Score Global

| Critère      | Note  | Commentaire                                       |
| ------------ | ----- | ------------------------------------------------- |
| Architecture | 4/5   | Bonne séparation, import circulaire mineur        |
| TypeScript   | 4.5/5 | Typage strict, quelques types de retour manquants |
| Performance  | 5/5   | Pas de re-render inutile, state local par carte   |
| Formatage    | 4.5/5 | Calculs corrects, nommage à améliorer             |
| UX           | 4/5   | UI claire avec Tailwind, animation en bonus       |

**Note finale : 4.4/5** ⭐⭐⭐⭐

---

## Actions Prioritaires

1. **Extraire le type Mission** dans `types.ts` pour éviter l'import circulaire
2. **Renommer les fonctions** selon les conventions du test (`formatDuration`, `calculateTotal`)
3. **Corriger l'orthographe** : "Formated" → "Formatted"
4. **Ajouter une animation** de transition pour le collapse/expand (bonus)

---

## ✨ Conclusion

Le code est de **bonne qualité** et respecte **toutes les contraintes principales** du test :

- ✅ Exercice 1 : Liste de missions avec formatage correct
- ✅ Exercice 2 : Toggle collapse/expand avec state indépendant
- ✅ Bonus Niveau 2 : Total missions + prix cumulé
- ✅ TypeScript strict sans `any`
- ✅ Accessibilité avec `aria-label`

**Temps** : 45 minutes pour les 2 exercices + 1 bonus → **Excellent rythme** 🏃

Le principal point d'amélioration est l'**organisation des types** (import circulaire). Avec cette correction mineure, le test serait **parfait** !

Les bonus restants (filtres, tri, localStorage) ajouteraient une vraie valeur métier. 🚀
