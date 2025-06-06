import { useQuery } from "@tanstack/react-query";
import { searchDogs, getDogsByIds } from "../api/dogApi";
import { DogRow } from "./DogRow";

export function DogTable() {
  // Query for dog search result IDs
  const {
    data: searchResult,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["dogSearch", {}],
    queryFn: () => searchDogs({}),
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
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Breed</th>
          <th>Zip Code</th>
        </tr>
      </thead>
      <tbody>
        {dogs && dogs.map((dog) => <DogRow key={dog.id} dog={dog} />)}
      </tbody>
    </table>
  );
}