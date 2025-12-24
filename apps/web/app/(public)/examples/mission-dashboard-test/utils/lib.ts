import { Mission } from "../page";

interface FormatDurationParams {
  minutes: number;
}

export const getFormatedDuration = ({ minutes }: FormatDurationParams) => {
  const getHours = Math.floor(minutes / 60);
  const getMinutes = minutes % 60;

  if (getMinutes === 0) return `${getHours}h`;
  return `${getHours}h${getMinutes}`;
};

export const calculateMissionPrice = (mission: Mission): number => {
  return (mission.pricePerHour * mission.durationInMinutes) / 60;
};

export const getFormatedPrice = (mission: Mission): string => {
  const price = calculateMissionPrice(mission).toFixed(2);
  return price.replace(".00", "");
};

export const getTotalMissions = (missions: Mission[]) => {
  return missions.length;
};

export const getTotalRevenue = (missions: Mission[]): number => {
  return missions.reduce(
    (acc, mission) => acc + calculateMissionPrice(mission),
    0
  );
};
