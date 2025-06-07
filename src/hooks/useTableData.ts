import { useTableSorting } from "./useTableSorting";
import { useTableFilters } from "./useTableFilters";
import { usePagination } from "./usePagination";
import { useFavorites } from "./useFavorites";
import { useQuery } from "@tanstack/react-query";
import { searchDogs, getDogsByIds } from "../api/dogApi";
import type { DogBreed } from "../types/breeds";
// import { useSearchParams } from "react-router";

export function useTableData(filters?: {
  selectedBreeds?: DogBreed[];
  minAge?: number | null;
  maxAge?: number | null;
}) {
  useTableFilters(filters);
  const { sortField, sortDirection, handleSort } = useTableSorting();
  // const [searchParams] = useSearchParams();
  const { size, from, handlePaginationChange } = usePagination();

  const sortParam = `${sortField}:${sortDirection}`;

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
