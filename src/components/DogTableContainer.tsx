import { useNavigate } from "react-router";
import { useTableData } from "../hooks/useTableData";
import { useFavorites } from "../hooks/useFavorites";
import { ErrorMessageWithAction } from "./ErrorMessageWithAction";
import { Pagination } from "./Pagination";
import DogFilters from "./DogFilters";
import { DogTable } from "./DogTable";
import type { Dog } from "../api/dogApi";

export function DogTableContainer() {
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
    selectedBreeds,
    setSelectedBreeds,
    minAge,
    maxAge,
    setMinAge,
    setMaxAge,
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
      <DogFilters
        selectedBreeds={selectedBreeds}
        setSelectedBreeds={setSelectedBreeds}
        minAge={minAge}
        maxAge={maxAge}
        onMinAgeChange={setMinAge}
        onMaxAgeChange={setMaxAge}
      />
      <DogTable
        dogs={dogs as Dog[]}
        favouriteIds={favouriteIds}
        isAllFavourited={isAllFavourited}
        handleToggleAllFavourites={handleToggleAllFavourites}
        handleToggleFavourite={handleToggleFavourite}
        sortField={sortField}
        sortDirection={sortDirection as "asc" | "desc"}
        handleSort={handleSort}
      />
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
