import { useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router";
import type { DogBreed } from "../types/breeds";

export function useTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevFiltersRef = useRef<{
    selectedBreeds?: DogBreed[];
  }>({});

  // selectedBreeds from URL params
  const breedsParams = searchParams.getAll("breeds");
  const selectedBreeds: DogBreed[] = breedsParams as DogBreed[];

  // minAge/maxAge from URL params
  const minAgeParam = searchParams.get("ageMin");
  const maxAgeParam = searchParams.get("ageMax");
  const minAge = minAgeParam !== null ? Number(minAgeParam) : null;
  const maxAge = maxAgeParam !== null ? Number(maxAgeParam) : null;

  // Setters update the URL params
  const setMinAge = useCallback(
    (value: number | null) => {
      const newParams = new URLSearchParams(window.location.search);
      if (value === null || value === undefined || isNaN(value)) {
        newParams.delete("ageMin");
      } else {
        newParams.set("ageMin", String(value));
      }
      setSearchParams(newParams);
    },
    [setSearchParams]
  );

  const setMaxAge = useCallback(
    (value: number | null) => {
      const newParams = new URLSearchParams(window.location.search);
      if (value === null || value === undefined || isNaN(value)) {
        newParams.delete("ageMax");
      } else {
        newParams.set("ageMax", String(value));
      }
      setSearchParams(newParams);
    },
    [setSearchParams]
  );

  const setSelectedBreeds = useCallback(
    (breeds: DogBreed[]) => {
      const newParams = new URLSearchParams(window.location.search);
      newParams.delete("breeds");
      if (breeds && breeds.length > 0) {
        breeds.forEach((breed) => newParams.append("breeds", breed));
      }
      // Reset pagination on filter change
      newParams.set("from", "0");
      setSearchParams(newParams);
    },
    [setSearchParams]
  );

  // Sync selectedBreeds to URL if changed (for external changes)
  useEffect(() => {
    const prev = prevFiltersRef.current;
    const breedsChanged =
      JSON.stringify(prev?.selectedBreeds || []) !==
      JSON.stringify(selectedBreeds || []);
    if (breedsChanged) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("breeds");
      if (selectedBreeds && selectedBreeds.length > 0) {
        selectedBreeds.forEach((breed) => newParams.append("breeds", breed));
      }
      newParams.set("from", "0"); // Reset pagination on filter change
      setSearchParams(newParams);
    }
    prevFiltersRef.current = {
      selectedBreeds,
    };
  }, [selectedBreeds, searchParams, setSearchParams]);

  return {
    selectedBreeds,
    setSelectedBreeds,
    minAge,
    maxAge,
    setMinAge,
    setMaxAge,
  };
}
