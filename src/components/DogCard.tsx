import React from "react";
import type { Dog } from "../interfaces/dog";
import { BreedBadge } from "./BreedBadge";
import type { Location } from "../interfaces/location";

interface DogCardProps {
  dog: Dog;
  highlight?: boolean;
  location?: Location;
}

const DogCard: React.FC<DogCardProps> = ({ dog, highlight, location }) => {
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
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-lg truncate" title={dog.name}>
            {dog.name}
          </span>
          <span className="text-xs text-gray-500 font-normal ml-2">
            Age: {dog.age}
          </span>
        </div>
        <div className="mb-2">
          <BreedBadge breed={dog.breed} />
        </div>
        {location && (
          <div className="mb-1 text-xs text-gray-600 flex flex-col gap-0.5">
            <span className="flex items-center gap-1">
              <span role="img" aria-label="location">
                📍
              </span>
              <span className="text-gray-400">
                {location.city}, {location.state}
              </span>
            </span>
            <span className="flex items-center gap-2 text-xs  ml-5 text-gray-400">
              {location.county} County
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-400">Zip: {dog.zip_code}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogCard;
