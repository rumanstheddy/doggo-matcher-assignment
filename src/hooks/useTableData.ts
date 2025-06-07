import { useEffect, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchDogs, getDogsByIds } from "../api/dogApi";
import { useSearchParams } from "react-router";
import { usePagination } from "./usePagination";
import { useFavorites } from "./useFavorites";
import type { DogBreed } from "../types/breeds";

export function useTableData(filters?: {
  selectedBreeds?: DogBreed[];
  minAge?: number | null;
  maxAge?: number | null;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { size, from, handlePaginationChange } = usePagination();

  const sortField = searchParams.get("sortField") || "breed";
  const sortDirection =
    searchParams.get("sortDirection") === "desc" ? "desc" : "asc";

  // Set default sort and pagination params in URL on first load if not present
  useEffect(() => {
    const newParams: Record<string, string> = {
      ...Object.fromEntries(searchParams),
    };
    let changed = false;
    if (!searchParams.get("sortField")) {
      newParams.sortField = sortField || "breed";
      changed = true;
    }
    if (!searchParams.get("sortDirection")) {
      newParams.sortDirection = sortDirection || "asc";
      changed = true;
    }
    if (!searchParams.get("from")) {
      newParams.from = "0";
      changed = true;
    }
    if (!searchParams.get("size")) {
      newParams.size = "25";
      changed = true;
    }
    if (changed) {
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams, sortField, sortDirection]);

  // Only reset to first page (from=0) when filters actually change
  const prevFiltersRef = useRef<{
    selectedBreeds?: DogBreed[];
    minAge?: number | null;
    maxAge?: number | null;
  }>({});
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      const prev = prevFiltersRef.current;
      const breedsChanged =
        JSON.stringify(prev.selectedBreeds || []) !==
        JSON.stringify(filters?.selectedBreeds || []);
      const minAgeChanged = prev.minAge !== filters?.minAge;
      const maxAgeChanged = prev.maxAge !== filters?.maxAge;
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
  }, [
    filters?.selectedBreeds,
    filters?.minAge,
    filters?.maxAge,
    setSearchParams,
  ]);

  const handleSort = useCallback(
    (field: string) => {
      let direction = "asc";
      if (sortField === field) {
        direction = sortDirection === "asc" ? "desc" : "asc";
      }
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sortField: field,
        sortDirection: direction,
      });
    },
    [sortField, sortDirection, searchParams, setSearchParams]
  );

  const sortParam = `${sortField}:${sortDirection}`;

  // Update: include 'from' and 'size' in the dog search query
  const {
    data: searchResult,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: [
      "dogSearch",
      {
        sort: sortParam,
        from,
        size,
        breeds: filters?.selectedBreeds,
        ageMin: filters?.minAge,
        ageMax: filters?.maxAge,
      },
    ],
    queryFn: () =>
      searchDogs({
        sort: sortParam,
        from,
        size,
        breeds:
          filters?.selectedBreeds && filters.selectedBreeds.length > 0
            ? filters.selectedBreeds
            : undefined,
        ageMin: filters?.minAge ?? undefined,
        ageMax: filters?.maxAge ?? undefined,
      }),
  });

  const total = searchResult?.total || 0;
  const currentPage = Math.floor(from / size) + 1;
  const totalPages = Math.ceil(total / size);

  // Query for dog details by IDs (only if searchResult is available)
  const {
    data: dogs,
    isLoading: dogsLoading,
    error: dogsError,
  } = useQuery({
    queryKey: ["dogDetails", searchResult?.resultIds],
    queryFn: () =>
      searchResult && searchResult.resultIds.length > 0
        ? getDogsByIds(searchResult.resultIds)
        : Promise.resolve([]),
    enabled: !!searchResult,
  });

  // Use useFavorites for allIds
  const allIds = dogs?.map((d) => d.id) || [];
  const {
    favouriteIds,
    isAllFavourited,
    handleToggleAllFavourites,
    handleToggleFavourite,
  } = useFavorites(allIds);

  return {
    sortField,
    sortDirection,
    handleSort,
    searchLoading,
    dogsLoading,
    searchError,
    dogsError,
    dogs,
    favouriteIds,
    isAllFavourited,
    handleToggleAllFavourites,
    handleToggleFavourite,
    currentPage,
    totalPages,
    handlePaginationChange,
  };
}
