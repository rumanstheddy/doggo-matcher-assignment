import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchDogs, getDogsByIds } from "../api/dogApi";
import { useSearchParams } from "react-router";

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

export function useDogTableData() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = searchParams.get("sortField") || "breed";
  const sortDirection =
    searchParams.get("sortDirection") === "desc" ? "desc" : "asc";
  const [favouriteIds, setFavouriteIds] = useState<string[]>(
    getLocalStorageFavourites()
  );

  // Set default sort params in URL on first load if not present
  useEffect(() => {
    if (!searchParams.get("sortField") || !searchParams.get("sortDirection")) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sortField: sortField || "breed",
        sortDirection: sortDirection || "asc",
      });
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

  // Query for dog search result IDs
  const {
    data: searchResult,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["dogSearch", { sort: sortParam }],
    queryFn: () => searchDogs(sortParam ? { sort: sortParam } : {}),
  });

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
  };
}
