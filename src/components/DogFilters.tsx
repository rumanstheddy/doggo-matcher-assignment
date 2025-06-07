import React, { useEffect } from "react";
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
      <div className="flex flex-wrap gap-4 items-end mb-4">
        <div>
          <BreedSelect
            selectedBreeds={pendingBreeds}
            setSelectedBreeds={setPendingBreeds}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Age</label>
          <input
            type="number"
            min={0}
            className="input input-bordered w-24"
            value={pendingMinAge ?? ""}
            onChange={(e) =>
              setPendingMinAge(e.target.value ? Number(e.target.value) : null)
            }
            placeholder="Any"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Age</label>
          <input
            type="number"
            min={0}
            className="input input-bordered w-24"
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
            className="btn btn-error text-white"
            onClick={handleClearAll}
          >
            Clear all
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleApply}
          >
            Apply
          </button>
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
