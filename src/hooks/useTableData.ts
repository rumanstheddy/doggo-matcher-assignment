import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchDogs, getDogsByIds } from "../api/dogApi";
import { useSearchParams } from "react-router";
import { usePagination } from "./usePagination";

function getLocalStorageFavKey() {
  const name = localStorage.getItem("userName") || "default";
  const email = localStorage.getItem("userEmail") || "default";
  return `favouriteDogIds_${name}_${email}`;
}

function getLocalStorageFavourites() {
  return JSON.parse(localStorage.getItem(getLocalStorageFavKey()) || "[]");
}

function setLocalStorageFavourites(ids: string[]) {
  localStorage.setItem(getLocalStorageFavKey(), JSON.stringify(ids));
}

export function useTableData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { size, from, handlePaginationChange } = usePagination();

  const sortField = searchParams.get("sortField") || "breed";
  const sortDirection =
    searchParams.get("sortDirection") === "desc" ? "desc" : "asc";
  const [favouriteIds, setFavouriteIds] = useState<string[]>(
    getLocalStorageFavourites()
  );

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
    setFavouriteIds(getLocalStorageFavourites());
  }, [searchParams, setSearchParams, sortField, sortDirection]);

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
    queryKey: ["dogSearch", { sort: sortParam, from, size }],
    queryFn: () => searchDogs({ sort: sortParam, from, size }),
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

  useEffect(() => {
    setFavouriteIds(getLocalStorageFavourites());
  }, [dogs]);

  const allIds = dogs?.map((d) => d.id) || [];
  const isAllFavourited =
    allIds.length > 0 && allIds.every((id) => favouriteIds.includes(id));

  function handleToggleAllFavourites() {
    if (isAllFavourited) {
      // Remove all current page dogs from favourites
      const updated = favouriteIds.filter((id) => !allIds.includes(id));
      setLocalStorageFavourites(updated);
      setFavouriteIds(updated);
    } else {
      // Add all current page dogs to favourites
      const updated = Array.from(new Set([...favouriteIds, ...allIds]));
      setLocalStorageFavourites(updated);
      setFavouriteIds(updated);
    }
  }

  function handleToggleFavourite(id: string) {
    let updated;
    if (favouriteIds.includes(id)) {
      updated = favouriteIds.filter((favId) => favId !== id);
    } else {
      updated = [...favouriteIds, id];
    }
    setLocalStorageFavourites(updated);
    setFavouriteIds(updated);
  }

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
