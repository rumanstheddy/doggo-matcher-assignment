import { useNavigate } from "react-router";
import { useTableData } from "../hooks/useTableData";
import { useFavorites } from "../hooks/useFavorites";
import { DogRow } from "./DogRow";
import { SortableTableHeader } from "./SortableTableHeader";
import { FavouriteTableHeader } from "./FavouriteTableHeader";
import { ErrorMessageWithAction } from "./ErrorMessageWithAction";
import { Pagination } from "./Pagination";
import type { Dog } from "../api/dogApi";

const SORTABLE_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "breed", label: "Breed" },
];

export function DogTable() {
  const {
    sortField,
    sortDirection,
    handleSort,
    searchLoading,
    dogsLoading,
    searchError,
    dogsError,
    dogs,
    currentPage,
    totalPages,
    handlePaginationChange,
  } = useTableData();

  const allIds = (dogs as Dog[] | undefined)?.map((d) => d.id) || [];
  const {
    favouriteIds,
    isAllFavourited,
    handleToggleAllFavourites,
    handleToggleFavourite,
  } = useFavorites(allIds);

  const navigate = useNavigate();

  if (searchLoading || dogsLoading) return <div>Loading...</div>;
  if (searchError)
    return (
      <ErrorMessageWithAction
        message={(searchError as Error).message}
        onBack={() => navigate("/login", { replace: true })}
      />
    );
  if (dogsError)
    return (
      <ErrorMessageWithAction
        message={(dogsError as Error).message}
        onBack={() => navigate("/login", { replace: true })}
      />
    );

  return (
    <>
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
                sortDirection={
                  sortField === col.key
                    ? (sortDirection as "asc" | "desc" | undefined)
                    : undefined
                }
                onClick={() => handleSort(col.key)}
              />
            ))}
            <th className="border-b border-base-300 px-4 py-2">Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {dogs &&
            (dogs as Dog[]).map((dog) => (
              <DogRow
                key={dog.id}
                dog={dog as Dog}
                isFavourite={favouriteIds.includes(dog.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePaginationChange}
        pageSize={
          (dogs as Dog[]).length > 0 ? (dogs as Dog[]).length : undefined
        }
      />
    </>
  );
}
