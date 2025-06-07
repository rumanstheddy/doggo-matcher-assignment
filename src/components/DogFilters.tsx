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
  return (
    <>
      <div className="flex flex-wrap gap-4 items-end mb-4">
        <div>
          {/* <label className="block text-sm font-medium mb-1">Breed</label> */}
          <BreedSelect
            selectedBreeds={selectedBreeds}
            setSelectedBreeds={setSelectedBreeds}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Age</label>
          <input
            type="number"
            min={0}
            className="input input-bordered w-24"
            value={minAge ?? ""}
            onChange={(e) =>
              onMinAgeChange(e.target.value ? Number(e.target.value) : null)
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
            value={maxAge ?? ""}
            onChange={(e) =>
              onMaxAgeChange(e.target.value ? Number(e.target.value) : null)
            }
            placeholder="Any"
          />
        </div>
        <div className="flex-1 flex justify-end items-end">
          <button
            type="button"
            className="btn btn-outline btn-error"
            onClick={() => {
              setSelectedBreeds([]);
              onMinAgeChange(null);
              onMaxAgeChange(null);
            }}
          >
            Clear All Filters
          </button>
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
