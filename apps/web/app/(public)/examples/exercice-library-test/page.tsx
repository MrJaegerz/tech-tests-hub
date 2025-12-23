import ExerciceTable from "./components/ExerciceTable";
import { MOCK_EXERCISES } from "./data";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: "chest" | "back" | "legs" | "shoulders" | "arms" | "core";
  difficulty: number;
  hasEquipment: boolean;
}

export default function ExercicesPage() {
  const exercises = MOCK_EXERCISES;

  return (
    <div className="p-8">
      <ExerciceTable exercises={exercises} />
    </div>
  );
}
