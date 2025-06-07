import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import type { DogBreed } from "../types/breeds";

export function useTableFilters(filters?: {
  selectedBreeds?: DogBreed[];
  minAge?: number | null;
  maxAge?: number | null;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevFiltersRef = useRef<typeof filters>({});
  const isFirstRun = useRef(true);

  // Sync filters to URL
  useEffect(() => {
    // Only update params if filters actually changed from previous
    const prev = prevFiltersRef.current;
    const breedsChanged =
      JSON.stringify(prev?.selectedBreeds || []) !==
      JSON.stringify(filters?.selectedBreeds || []);
    const minAgeChanged = prev?.minAge !== filters?.minAge;
    const maxAgeChanged = prev?.maxAge !== filters?.maxAge;
    if (breedsChanged || minAgeChanged || maxAgeChanged) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("breeds");
      if (filters?.selectedBreeds && filters.selectedBreeds.length > 0) {
        filters.selectedBreeds.forEach((breed) => newParams.append("breeds", breed));
      }
      if (filters?.minAge !== null && filters?.minAge !== undefined) {
        newParams.set("ageMin", String(filters.minAge));
      } else {
        newParams.delete("ageMin");
      }
      if (filters?.maxAge !== null && filters?.maxAge !== undefined) {
        newParams.set("ageMax", String(filters.maxAge));
      } else {
        newParams.delete("ageMax");
      }
      setSearchParams(newParams);
    }
    prevFiltersRef.current = {
      selectedBreeds: filters?.selectedBreeds,
      minAge: filters?.minAge,
      maxAge: filters?.maxAge,
    };
  }, [filters?.selectedBreeds, filters?.minAge, filters?.maxAge, searchParams, setSearchParams]);

  // Reset pagination on filter change
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      const prev = prevFiltersRef.current;
      const breedsChanged =
        JSON.stringify(prev?.selectedBreeds || []) !==
        JSON.stringify(filters?.selectedBreeds || []);
      const minAgeChanged = prev?.minAge !== filters?.minAge;
      const maxAgeChanged = prev?.maxAge !== filters?.maxAge;
      if (breedsChanged || minAgeChanged || maxAgeChanged) {
        setSearchParams((prevParams) => {
          const params = { ...Object.fromEntries(prevParams) };
          params.from = "0";
          return params;
        });
      }
    }
    prevFiltersRef.current = {
      selectedBreeds: filters?.selectedBreeds,
      minAge: filters?.minAge,
      maxAge: filters?.maxAge,
    };
  }, [filters?.selectedBreeds, filters?.minAge, filters?.maxAge, setSearchParams]);
}
