import { useState, useMemo, useRef } from "react";
import { ALL_BREEDS } from "../types/breeds";
import type { DogBreed } from "../types/breeds";
import { BreedBadge } from "./BreedBadge";
import { useModalClose } from "../hooks/useModalClose";

interface BreedSelectProps {
  selectedBreeds: DogBreed[];
  setSelectedBreeds: (breeds: DogBreed[]) => void;
}

interface BreedSelectModalProps {
  input: string;
  setInput: (val: string) => void;
  filteredBreeds: readonly DogBreed[];
  selectedBreeds: DogBreed[];
  setSelectedBreeds: (breeds: DogBreed[]) => void;
  hovered: number | null;
  setHovered: (idx: number | null) => void;
  handleSelect: (breed: DogBreed) => void;
  onClose: () => void;
}

function BreedSelectModal({
  input,
  setInput,
  filteredBreeds,
  selectedBreeds,
  setSelectedBreeds,
  hovered,
  setHovered,
  handleSelect,
  onClose,
}: BreedSelectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useModalClose(modalRef, onClose);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-transparent backdrop-blur-lg bg-opacity-60">
      <div
        ref={modalRef}
        className="bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[80vh] flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Select Dog Breeds</h2>
          <button
            className="btn btn-circle text-2xl hover:btn-error pb-1"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <input
          className="input w-full text-lg py-4 mb-4 focus:input-primary rounded-2xl"
          type="text"
          placeholder="Type to search breeds..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <div className="overflow-y-auto flex-1">
          <ul className="flex flex-col gap-1">
            {(input ? filteredBreeds : ALL_BREEDS).map((breed, idx) => (
              <li key={breed} className={"px-0 py-1"}>
                <button
                  type="button"
                  className={
                    "w-full text-left px-6 py-3 text-lg cursor-pointer rounded-lg transition hover:bg-base-200 hover:text-primary flex items-center" +
                    (hovered === idx ? " bg-base-200" : "")
                  }
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
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
        </div>
        {selectedBreeds.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
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
      </div>
    </div>
  );
}

export function BreedSelect({
  selectedBreeds,
  setSelectedBreeds,
}: BreedSelectProps) {
  const [input, setInput] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter breeds based on input
  const filteredBreeds = useMemo(() => {
    if (!input) return ALL_BREEDS;
    return ALL_BREEDS.filter((breed) =>
      breed.toLowerCase().includes(input.toLowerCase())
    );
  }, [input]);

  const handleSelect = (breed: DogBreed) => {
    if (!selectedBreeds.includes(breed)) {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
    setInput("");
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <label className="block text-sm font-medium mb-1">Select Breeds</label>
      <input
        className="input input-bordered w-full cursor-pointer bg-base-200"
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
          hovered={hovered}
          setHovered={setHovered}
          handleSelect={handleSelect}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
