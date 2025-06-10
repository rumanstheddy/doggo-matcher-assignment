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
  // Local state for age inputs
  const [pendingMinAge, setPendingMinAge] = React.useState<number | "">(
    minAge ?? ""
  );
  const [pendingMaxAge, setPendingMaxAge] = React.useState<number | "">(
    maxAge ?? ""
  );

  const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPendingMinAge(e.target.value === "" ? "" : Number(e.target.value));
  };
  const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPendingMaxAge(e.target.value === "" ? "" : Number(e.target.value));
  };
  const handleMinAgeBlur = () => {
    onMinAgeChange(pendingMinAge === "" ? null : (pendingMinAge as number));
  };
  const handleMaxAgeBlur = () => {
    onMaxAgeChange(pendingMaxAge === "" ? null : (pendingMaxAge as number));
  };

  const handleClearAll = () => {
    setSelectedBreeds([]);
    setPendingMinAge("");
    setPendingMaxAge("");
    onMinAgeChange(null);
    onMaxAgeChange(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 items-end my-4">
        <div className="flex flex-wrap gap-4 items-end mb-4">
          <div>
            <BreedSelect
              selectedBreeds={selectedBreeds}
              setSelectedBreeds={setSelectedBreeds}
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
              value={pendingMinAge}
              onChange={handleMinAgeChange}
              onBlur={handleMinAgeBlur}
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
              value={pendingMaxAge}
              onChange={handleMaxAgeChange}
              onBlur={handleMaxAgeBlur}
              placeholder="Any"
            />
          </div>
          <div className="flex-1 flex justify-end items-end gap-2">
            <button
              type="button"
              className="btn btn-error hover:text-white flex items-center gap-2 rounded-3xl"
              onClick={handleClearAll}
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
      {selectedBreeds.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 max-w-full sm:max-w-screen md:max-w-8/12 lg:max-w-6/12 overflow-hidden">
          {selectedBreeds.map((breed) => (
            <BreedBadge
              key={breed}
              breed={breed}
              removable
              onRemove={() =>
                setSelectedBreeds(selectedBreeds.filter((b) => b !== breed))
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DogFilters;
