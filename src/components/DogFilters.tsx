import React from "react";
import { BreedSelect } from "./BreedSelect";
import { BreedBadge } from "./BreedBadge";
import type { DogBreed } from "../types/breeds";

interface DogFiltersProps {
  selectedBreeds: DogBreed[];
  setSelectedBreeds: (breeds: DogBreed[]) => void;
  minAge: number | null;
  maxAge: number | null;
  onMinAgeChange: (age: number | null) => void;
  onMaxAgeChange: (age: number | null) => void;
}

const DogFilters: React.FC<DogFiltersProps> = ({
  selectedBreeds,
  setSelectedBreeds,
  minAge,
  maxAge,
  onMinAgeChange,
  onMaxAgeChange,
}) => {
  const [pendingBreeds, setPendingBreeds] =
    React.useState<DogBreed[]>(selectedBreeds);
  const [pendingMinAge, setPendingMinAge] = React.useState<number | null>(
    minAge
  );
  const [pendingMaxAge, setPendingMaxAge] = React.useState<number | null>(
    maxAge
  );

  const handleApply = () => {
    setSelectedBreeds(pendingBreeds);
    onMinAgeChange(pendingMinAge);
    onMaxAgeChange(pendingMaxAge);
  };

  const handleClearAll = () => {
    setPendingBreeds([]);
    setPendingMinAge(null);
    setPendingMaxAge(null);
    setSelectedBreeds([]);
    onMinAgeChange(null);
    onMaxAgeChange(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 items-end my-4">
        <div className="flex flex-wrap gap-4 items-end mb-4">
          <div>
            <BreedSelect
              selectedBreeds={pendingBreeds}
              setSelectedBreeds={setPendingBreeds}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 pl-2">
              Min Age
            </label>
            <input
              type="number"
              min={0}
              className="input w-24 rounded-2xl focus:input-primary"
              value={pendingMinAge ?? ""}
              onChange={(e) =>
                setPendingMinAge(e.target.value ? Number(e.target.value) : null)
              }
              placeholder="Any"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 pl-2">
              Max Age
            </label>
            <input
              type="number"
              min={0}
              className="input w-24 rounded-2xl focus:input-primary"
              value={pendingMaxAge ?? ""}
              onChange={(e) =>
                setPendingMaxAge(e.target.value ? Number(e.target.value) : null)
              }
              placeholder="Any"
            />
          </div>
          <div className="flex-1 flex justify-end items-end gap-2">
            <button
              type="button"
              className="btn hover:btn-error text-base-content flex items-center gap-2 rounded-3xl"
              onClick={handleClearAll}
            >
              Clear all
              <span className="text-md">✖️</span>
            </button>
            <button
              type="button"
              className="btn btn-md hover:btn-primary flex items-center gap-2 rounded-3xl"
              onClick={handleApply}
            >
              Apply
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 pt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.586-1.414L2 6.707A1 1 0 012 6V4z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {pendingBreeds.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 max-w-full sm:max-w-screen md:max-w-8/12 lg:max-w-6/12 overflow-hidden">
          {pendingBreeds.map((breed) => (
            <BreedBadge
              key={breed}
              breed={breed}
              removable
              onRemove={() =>
                setPendingBreeds(pendingBreeds.filter((b) => b !== breed))
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DogFilters;
