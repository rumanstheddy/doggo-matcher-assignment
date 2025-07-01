import { useTableSorting } from "./useTableSorting";
import { useTableFilters } from "./useTableFilters";
import { usePagination } from "./usePagination";
import { useFavorites } from "./useFavorites";
import { useQuery } from "@tanstack/react-query";
import { searchDogs, getDogsByIds } from "../api/dogApi";
import { useDogDetails } from "./useDogDetails";
import type { Dog } from "../interfaces/dog";

export function useTableData() {
  const {
    selectedBreeds,
    setSelectedBreeds,
    minAge,
    maxAge,
    setMinAge,
    setMaxAge,
  } = useTableFilters();
  const { sortField, sortDirection, handleSort } = useTableSorting();
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
        breeds: selectedBreeds,
        ageMin: minAge,
        ageMax: maxAge,
      },
    ],
    queryFn: () =>
      searchDogs({
        sort: sortParam,
        from,
        size,
        breeds:
          selectedBreeds && selectedBreeds.length > 0
            ? selectedBreeds
            : undefined,
        ageMin: minAge ?? undefined,
        ageMax: maxAge ?? undefined,
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

  // ? Fetch dog locations using useDogDetails
  const dogIds = dogs?.map((d) => d.id) || [];
  const { dogLocations } = useDogDetails(dogIds);

  const getLocation = (dog: Dog) => dogLocations?.[dog.zip_code];

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
    selectedBreeds,
    setSelectedBreeds,
    minAge,
    maxAge,
    setMinAge,
    setMaxAge,
    getLocation, // expose getLocation for table/row usage
  };
}
