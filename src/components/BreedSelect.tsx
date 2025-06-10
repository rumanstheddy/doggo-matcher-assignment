import { useState, useMemo } from "react";
import { ALL_BREEDS } from "../types/breeds";
import type { DogBreed } from "../types/breeds";
import { BreedSelectModal } from "./BreedSelectModal";

interface BreedSelectProps {
  selectedBreeds: DogBreed[];
  setSelectedBreeds: (breeds: DogBreed[]) => void;
}

export function BreedSelect({
  selectedBreeds,
  setSelectedBreeds,
}: BreedSelectProps) {
  const [input, setInput] = useState("");
  // const [hovered, setHovered] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter breeds based on input
  const filteredBreeds = useMemo(() => {
    if (!input) return ALL_BREEDS;
    return ALL_BREEDS.filter((breed) =>
      breed.toLowerCase().includes(input.toLowerCase())
    );
  }, [input]);

  return (
    <div className="w-full max-w-md mx-auto relative">
      <label className="block text-sm font-medium mb-1 pl-2">
        Select Breeds
      </label>
      <input
        className="input input-bordered w-full cursor-pointer bg-base-200 rounded-2xl"
        type="text"
        placeholder="Type to search breeds..."
        value={""}
        onFocus={() => setModalOpen(true)}
        readOnly
        tabIndex={0}
      />
      {modalOpen && (
        <BreedSelectModal
          input={input}
          setInput={setInput}
          filteredBreeds={filteredBreeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
          // hovered={hovered}
          // setHovered={setHovered}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
