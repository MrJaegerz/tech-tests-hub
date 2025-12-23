"use client";

import { useMemo, useState } from "react";

import { Exercise } from "../page";

interface ExerciceTableProps {
  exercises: Exercise[];
}

export default function ExerciceTable({ exercises }: ExerciceTableProps) {
  const [nameFilter, setNameFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("All");
  const [equipmentFilter, setEquipmentFilter] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "difficulty">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleFilterName = (name: string) => setNameFilter(name);
  const handleFilterGroup = (group: string) => setGroupFilter(group);
  const handleFilterEquipment = (hasEquipment: boolean) =>
    setEquipmentFilter(hasEquipment);

  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    // Filtering
    if (nameFilter) {
      filtered = filtered.filter((exercise) =>
        exercise.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (groupFilter !== "All") {
      filtered = filtered.filter(
        (exercise) =>
          exercise.muscleGroup.toLowerCase() === groupFilter.toLowerCase()
      );
    }

    if (equipmentFilter) {
      filtered = filtered.filter(
        (exercise) => exercise.hasEquipment === equipmentFilter
      );
    }

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      } else {
        if (sortOrder === "asc") {
          return a.difficulty - b.difficulty;
        } else {
          return b.difficulty - a.difficulty;
        }
      }
    });

    return filtered;
  }, [exercises, nameFilter, groupFilter, equipmentFilter, sortBy, sortOrder]);

  const handleSortName = (order: "asc" | "desc") => {
    setSortBy("name");
    setSortOrder(order);
  };

  const handleSortDifficulty = (order: "asc" | "desc") => {
    setSortBy("difficulty");
    setSortOrder(order);
  };

  return (
    <div>
      <div>
        <div>
          <div className="mt-4">
            <label htmlFor="name-filter" className="block mb-2">
              Filtre par nom :
            </label>
            <input
              id="name-filter"
              type="text"
              placeholder="Rechercher..."
              className="border p-2 rounded w-full max-w-xs"
              onChange={(e) => handleFilterName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="group-filter" className="block mb-2">
              Filtre par groupe :
            </label>
            <select
              id="group-filter"
              className="border p-2 rounded w-full max-w-xs mt-2"
              onChange={(e) => handleFilterGroup(e.target.value)}
            >
              <option value="All">Tous les groupes</option>
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Arms">Arms</option>
              <option value="Core">Core</option>
            </select>
          </div>
          <div className="mt-4">
            <label
              htmlFor="equipment-filter"
              className="flex items-center mt-2"
            >
              <input
                type="checkbox"
                id="equipment-filter"
                className="mr-2"
                onChange={(e) => handleFilterEquipment(e.target.checked)}
              />
              Activer le filtre équipement
            </label>
          </div>
        </div>
        <div>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() =>
                    handleSortName(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-1">
                      {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                    </span>
                    <span>Nom</span>
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-2">Groupe</th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() =>
                    handleSortDifficulty(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-1">
                      {sortBy === "difficulty" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </span>
                    <span>Difficulté</span>
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-2">Équipement</th>
              </tr>
            </thead>
            <tbody>
              {filteredExercises.length <= 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    Aucun exercice trouvé.
                  </td>
                </tr>
              ) : (
                filteredExercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {exercise.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {exercise.muscleGroup}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {exercise.difficulty}/5
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {exercise.hasEquipment ? "Oui" : "Non"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p>Total exercises: {filteredExercises.length}</p>
    </div>
  );
}
