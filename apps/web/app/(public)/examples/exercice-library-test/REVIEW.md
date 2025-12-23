# Code Review - Exercise Library Test

## ✅ Points Forts

**Architecture & Performance**
- ✅ Excellente utilisation de `useMemo` pour optimiser les calculs de filtrage/tri
- ✅ Toutes les dépendances correctement listées dans le tableau de dépendances
- ✅ Séparation claire entre la logique de filtrage et de tri
- ✅ State management simple et efficace avec `useState`
- ✅ Code propre, pas de console.log ni d'éléments inutiles

**TypeScript**
- ✅ Types stricts respectés, aucun `any`
- ✅ Union types bien utilisés pour `sortBy` et `sortOrder`
- ✅ Interface `ExerciceTableProps` correctement définie

**Fonctionnalités**
- ✅ Tous les filtres requis sont implémentés et fonctionnent
- ✅ Filtres cumulatifs opérationnels
- ✅ Message "Aucun exercice trouvé" présent
- ✅ Compteur de résultats affiché
- ✅ Accessibilité : labels avec `htmlFor` pour tous les inputs

---

## ⚠️ Problème Critique

### 1. **Bug de logique de tri** (Priorité Haute)

**Problème** : Le comportement du tri est incorrect quand on change de colonne.

```typescript
// Lignes 66-74 - Handlers actuels
const handleSortName = (order: "asc" | "desc") => {
  setSortBy("name");
  setSortOrder(order);
};

// Ligne 133 - Utilisation
onClick={() =>
  handleSortName(sortOrder === "asc" ? "desc" : "asc")
}
```

**Scénario problématique** :
1. Je trie par **Difficulté** en mode ascendant (`sortBy="difficulty"`, `sortOrder="asc"`)
2. Je clique sur la colonne **Nom**
3. Le code appelle `handleSortName("desc")` au lieu de `handleSortName("asc")`
4. Résultat : le tri par nom commence en mode descendant ❌

**Comportement attendu** : Quand on clique sur une nouvelle colonne, le tri devrait commencer en mode ascendant par défaut.

**Solution recommandée** :
```typescript
const handleSort = (column: "name" | "difficulty") => {
  if (sortBy === column) {
    // Toggle l'ordre si on reclique sur la même colonne
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    // Nouvelle colonne : commence en ascendant
    setSortBy(column);
    setSortOrder("asc");
  }
};

// Dans le JSX
<th onClick={() => handleSort("name")}>
<th onClick={() => handleSort("difficulty")}>
```

---

## 🔧 Améliorations Recommandées

### 2. **Handlers de filtres redondants** (Lignes 18-21)

Les wrappers `handleFilterName`, `handleFilterGroup`, `handleFilterEquipment` n'apportent aucune valeur et complexifient le code inutilement.

**Avant** :
```typescript
const handleFilterName = (name: string) => setNameFilter(name);
// ...
onChange={(e) => handleFilterName(e.target.value)}
```

**Après** :
```typescript
onChange={(e) => setNameFilter(e.target.value)}
```

**Impact** : Simplifie le code et réduit de 6 lignes.

---

### 3. **Capitalisation incohérente des options** (Lignes 103-108)

Les valeurs du select sont capitalisées ("Chest", "Back") alors que les données sont en minuscule ("chest", "back").

```tsx
// ❌ Actuel - nécessite toLowerCase() dans le filtre (ligne 36)
<option value="Chest">Chest</option>
<option value="Back">Back</option>

// ✅ Recommandé - cohérence avec les données
<option value="chest">Chest</option>
<option value="back">Back</option>
```

**Bénéfice** : Permet de supprimer le `.toLowerCase()` ligne 36 et rend le code plus cohérent.

---

### 4. **Label du filtre équipement peu clair** (Ligne 122)

```tsx
// ❌ Actuel - trop verbeux
"Activer le filtre équipement"

// ✅ Recommandé - correspond aux specs
"Avec équipement uniquement"
```

Correspond exactement au libellé demandé dans les requirements du test.

---

### 5. **Structure HTML peu sémantique** (Lignes 77-79)

Trois `<div>` imbriqués sans classes ni rôles sémantiques.

```tsx
// ❌ Actuel
<div>
  <div>
    <div>

// ✅ Recommandé
<section className="space-y-6">
  <div className="filters-container space-y-4">
    {/* Filtres */}
  </div>
  <div className="table-container">
```

**Bénéfice** : Meilleure accessibilité et maintenance du code.

---

### 6. **Absence de titre principal**

La page n'a pas de titre `<h1>` pour identifier le contenu.

```tsx
// page.tsx - Recommandé
<div className="p-8">
  <h1 className="text-2xl font-bold mb-6">Bibliothèque d'Exercices</h1>
  <ExerciceTable exercises={exercises} />
</div>
```

---

## 💡 Améliorations Bonus

### Affichage des étoiles pour la difficulté

```typescript
const DifficultyStars = ({ level }: { level: number }) => (
  <span className="text-yellow-500" aria-label={`Difficulté ${level}/5`}>
    {"★".repeat(level)}{"☆".repeat(5 - level)}
  </span>
);

// Dans le tableau
<td className="border border-gray-300 px-4 py-2">
  <DifficultyStars level={exercise.difficulty} />
</td>
```

### Highlight du texte recherché

```typescript
const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

// Utilisation
<td className="border border-gray-300 px-4 py-2">
  <HighlightText text={exercise.name} query={nameFilter} />
</td>
```

### Badges colorés pour les groupes musculaires

```typescript
const muscleGroupColors: Record<Exercise['muscleGroup'], string> = {
  chest: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  back: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  legs: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  shoulders: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  arms: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  core: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
};

// Dans le tableau
<td className="border border-gray-300 px-4 py-2">
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${muscleGroupColors[exercise.muscleGroup]}`}>
    {exercise.muscleGroup}
  </span>
</td>
```

---

## 📊 Score Global

| Critère | Note | Commentaire |
|---------|------|-------------|
| Architecture | 4.5/5 | Excellente séparation, useMemo parfait |
| TypeScript | 5/5 | Types stricts, pas de any |
| Performance | 5/5 | Optimisation correcte avec useMemo |
| UX | 3.5/5 | Fonctionnel mais bug de tri critique |
| Code Quality | 4/5 | Propre, bien organisé, wrappers à simplifier |

**Note finale : 4.4/5** ⭐⭐⭐⭐

---

## 🎯 Actions Prioritaires

1. **Corriger le bug de tri** (critique) - Utiliser la solution avec `handleSort` unique
2. **Simplifier les handlers de filtres** - Appeler directement les setters
3. **Uniformiser la casse des options** - Passer de "Chest" à "chest"
4. **Améliorer le label équipement** - "Avec équipement uniquement"
5. **Ajouter un titre `<h1>`** sur la page principale

---

## ✨ Conclusion

Le code est de **très bonne qualité** et respecte bien les contraintes du test :
- ✅ Toutes les fonctionnalités sont implémentées
- ✅ Code TypeScript strict et propre
- ✅ Performance optimisée avec useMemo
- ✅ Interface accessible avec labels

Le principal point bloquant est le **bug de tri lors du changement de colonne**. Avec cette correction, le test serait **excellent** et production-ready !

Les améliorations bonus (étoiles, highlight, badges) ajouteraient un vrai polish UX qui marquerait des points supplémentaires en entretien. 🚀
