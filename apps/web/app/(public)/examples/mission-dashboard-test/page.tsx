import CardMission from "./components/CardMission";
import { MOCK_MISSIONS } from "./data";
import { getTotalMissions, getTotalRevenue } from "./utils/lib";

export type Mission = {
  id: number;
  job: string;
  pricePerHour: number;
  durationInMinutes: number;
};

export default function MissionsPage() {
  const missions = MOCK_MISSIONS;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Missions disponibles</h1>
      <span>Total missions: {getTotalMissions(missions)}</span>
      <br />
      <span>Total revenue: {getTotalRevenue(missions).toFixed(2)}€</span>
      <div className="mt-6">
        {missions.length === 0 ? (
          <p>Aucune mission disponible pour le moment.</p>
        ) : (
          missions.map((mission) => (
            <CardMission key={mission.id} mission={mission} />
          ))
        )}
      </div>
    </div>
  );
}
