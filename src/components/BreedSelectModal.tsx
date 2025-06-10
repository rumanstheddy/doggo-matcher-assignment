import { useState, useRef } from "react";
import type { DogBreed } from "../types/breeds";
import { ALL_BREEDS } from "../types/breeds";
import { BreedBadge } from "./BreedBadge";
import { useCloseOnBlurOrEscape } from "../hooks/useCloseOnBlurOrEscape";
import CloseIconButton from "./CloseIconButton";

interface BreedSelectModalProps {
  input: string;
  setInput: (val: string) => void;
  filteredBreeds: readonly DogBreed[];
  selectedBreeds: DogBreed[];
  setSelectedBreeds: (breeds: DogBreed[]) => void;
  onClose: () => void;
}

export function BreedSelectModal({
  input,
  setInput,
  filteredBreeds,
  selectedBreeds,
  setSelectedBreeds,
  onClose,
}: BreedSelectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // Local state for pending breeds
  const [pendingBreeds, setPendingBreeds] =
    useState<DogBreed[]>(selectedBreeds);

  useCloseOnBlurOrEscape(modalRef, () => {
    setSelectedBreeds(pendingBreeds);
    onClose();
  });

  const handleSelect = (breed: DogBreed) => {
    if (!pendingBreeds.includes(breed)) {
      setPendingBreeds([...pendingBreeds, breed]);
    }
    setInput("");
  };

  const handleRemove = (breed: DogBreed) => {
    setPendingBreeds(pendingBreeds.filter((b) => b !== breed));
  };

  const handleClearAll = () => {
    setPendingBreeds([]);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-transparent backdrop-blur-lg bg-opacity-60">
      <div
        ref={modalRef}
        className="bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[80vh] flex flex-col relative"
      >
        {/* Top shadow */}
        <div className="pointer-events-none absolute left-0 top-0 w-full h-6 z-10 bg-gradient-to-b from-black/10 to-transparent rounded-t-2xl" />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Select Dog Breeds</h2>

          <CloseIconButton
            className="btn btn-circle btn-sm text-2xl btn-error text-white pb-1 hover:scale-105"
            onClick={() => {
              setSelectedBreeds(pendingBreeds);
              onClose();
            }}
            aria-label="Close"
          />
        </div>
        <input
          className="input w-full text-lg py-4 mb-4 focus:input-primary rounded-2xl"
          type="text"
          placeholder="Type to search breeds..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <div className="overflow-y-auto flex-1 relative">
          <ul className="flex flex-col gap-1 p-1">
            {(input ? filteredBreeds : ALL_BREEDS).map((breed) => (
              <li key={breed} className={"px-0 py-1"}>
                <button
                  type="button"
                  className={
                    "w-full text-left px-6 py-3 text-lg cursor-pointer rounded-lg transition flex items-center bg-base-300 hover:bg-primary/80 hover:text-white" +
                    (pendingBreeds.includes(breed)
                      ? " ring-2 ring-primary"
                      : "")
                  }
                  onMouseDown={() => handleSelect(breed)}
                  tabIndex={0}
                >
                  {breed}
                </button>
              </li>
            ))}
            {(input ? filteredBreeds : ALL_BREEDS).length === 0 && (
              <li className="px-6 py-3 text-gray-400 text-lg">
                No breeds found
              </li>
            )}
          </ul>
          {/* Bottom shadow */}
          <div className="pointer-events-none absolute left-0 bottom-0 w-full h-6 z-10 bg-gradient-to-t from-black/10 to-transparent rounded-b-2xl" />
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold block">
              Filters ready to be applied:
            </span>
            <button
              className="btn btn-sm btn-error ml-2 hover:text-white rounded-3xl"
              onClick={handleClearAll}
              type="button"
              disabled={pendingBreeds.length === 0}
            >
              Clear all
            </button>
          </div>
          {pendingBreeds.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-6 items-center">
              {pendingBreeds.map((breed) => (
                <li key={breed}>
                  <BreedBadge
                    key={breed}
                    breed={breed}
                    removable
                    onRemove={() => handleRemove(breed)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
