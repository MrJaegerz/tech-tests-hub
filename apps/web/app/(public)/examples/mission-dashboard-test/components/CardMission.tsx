"use client";

import { useState } from "react";
import { Mission } from "../page";
import { getFormatedDuration, getFormatedPrice } from "../utils/lib";

export default function CardMission({ mission }: { mission: Mission }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDuration = getFormatedDuration({
    minutes: mission.durationInMinutes,
  });
  const price = getFormatedPrice(mission);

  return (
    <div className="w-72 border mb-4 rounded-lg p-4 shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold mb-2">{mission.job}</h2>
        <button
          aria-label="Toggle mission details"
          className="text-xl font-bold mb-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "-" : "+"}
        </button>
      </div>
      {isOpen && (
        <div className="mb-4">
          <ul className="">
            <li>
              Durée: {formatDuration} ({mission.durationInMinutes} minutes)
            </li>
            <li>Tarif: {mission.pricePerHour}€/h</li>
            <li>Prix total: {price}€</li>
          </ul>
        </div>
      )}
    </div>
  );
}
