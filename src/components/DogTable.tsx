import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchDogs, getDogsByIds } from "../api/dogApi";
import { DogRow } from "./DogRow";
import { SortableTableHeader } from "./SortableTableHeader";
import type { SortDirection } from "./SortableTableHeader";

const SORTABLE_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "breed", label: "Breed" },
];

export function DogTable() {
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<SortDirection>(undefined);

  const handleSort = useCallback(
    (field: string) => {
      if (sortField !== field) {
        setSortField(field);
        setSortDirection("asc");
      } else {
        setSortDirection((prev) =>
          prev === "asc"
            ? "desc"
            : prev === "desc"
            ? undefined
            : "asc"
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

  if (searchLoading || dogsLoading) return <div>Loading...</div>;
  if (searchError)
    return <div className="text-error">{(searchError as Error).message}</div>;
  if (dogsError)
    return <div className="text-error">{(dogsError as Error).message}</div>;

  return (
    <table className="table w-full max-w-3xl border border-base-300 rounded-3xl overflow-hidden shadow-lg mt-4">
      <thead>
        <tr className="bg-base-200">
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
        {dogs && dogs.map((dog) => <DogRow key={dog.id} dog={dog} />)}
      </tbody>
    </table>
  );
}
