import React from "react";
import type { Dog } from "../api/dogApi";
import { BreedBadge } from "./BreedBadge";

interface DogCardProps {
  dog: Dog;
  highlight?: boolean;
}

const DogCard: React.FC<DogCardProps> = ({ dog, highlight }) => {
  return (
    <div
      className={`card bg-base-100 w-64 shadow-sm transition-all ${
        highlight ? "ring-4 ring-primary scale-105" : ""
      }`}
    >
      <figure>
        <img
          src={dog.img}
          alt={dog.name}
          className="w-full h-36 object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">
          {dog.name}
          <span className="text-xs text-gray-500 font-normal">Age: {dog.age}</span>
        </h2>
        <p className="truncate text-xs">Zip: {dog.zip_code}</p>
        <div className="card-actions justify-end mt-2">
          <BreedBadge breed={dog.breed} />
        </div>
      </div>
    </div>
  );
};

export default DogCard;
