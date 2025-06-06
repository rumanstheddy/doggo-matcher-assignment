import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchDogs, getDogsByIds } from "../api/dogApi";
import { DogRow } from "./DogRow";
import {
  SortableTableHeader,
  FavouriteTableHeader,
} from "./SortableTableHeader";
import type { SortDirection } from "./SortableTableHeader";

const SORTABLE_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "breed", label: "Breed" },
];

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

export function DogTable() {
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<SortDirection>(undefined);
  const [favouriteIds, setFavouriteIds] = useState<string[]>(
    getLocalStorageFavourites()
  );

  const handleSort = useCallback(
    (field: string) => {
      if (sortField !== field) {
        setSortField(field);
        setSortDirection("asc");
      } else {
        setSortDirection((prev) =>
          prev === "asc" ? "desc" : prev === "desc" ? undefined : "asc"
        );
        if (sortDirection === "desc") setSortField(undefined);
      }
    },
    [sortField, sortDirection]
  );

  const sortParam =
    sortField && sortDirection ? `${sortField}:${sortDirection}` : undefined;

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

  // Update favouriteIds state if localStorage changes (e.g., by another DogRow)
  // Optionally, you could use a custom event or context for more robust sync
  // For now, update on mount and when dogs change
  useState(() => {
    setFavouriteIds(getLocalStorageFavourites());
  });

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

  if (searchLoading || dogsLoading) return <div>Loading...</div>;
  if (searchError)
    return <div className="text-error">{(searchError as Error).message}</div>;
  if (dogsError)
    return <div className="text-error">{(dogsError as Error).message}</div>;

  return (
    <table className="table w-full max-w-3xl border border-base-300 rounded-3xl overflow-hidden shadow-lg mt-4">
      <thead>
        <tr className="bg-base-200">
          <FavouriteTableHeader
            onClick={handleToggleAllFavourites}
            isAllFavourited={isAllFavourited}
          />
          {SORTABLE_COLUMNS.map((col) => (
            <SortableTableHeader
              key={col.key}
              label={col.label}
              sortDirection={sortField === col.key ? sortDirection : undefined}
              onClick={() => handleSort(col.key)}
            />
          ))}
          <th className="border-b border-base-300 px-4 py-2">Zip Code</th>
        </tr>
      </thead>
      <tbody>
        {dogs &&
          dogs.map((dog) => (
            <DogRow
              key={dog.id}
              dog={dog}
              isFavourite={favouriteIds.includes(dog.id)}
              onToggleFavourite={(id) => {
                let updated;
                if (favouriteIds.includes(id)) {
                  updated = favouriteIds.filter((favId) => favId !== id);
                } else {
                  updated = [...favouriteIds, id];
                }
                setLocalStorageFavourites(updated);
                setFavouriteIds(updated);
              }}
            />
          ))}
      </tbody>
    </table>
  );
}
