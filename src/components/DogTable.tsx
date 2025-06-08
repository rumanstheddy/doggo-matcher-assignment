import { DogRow } from "./DogRow";
import { SortableTableHeader } from "./SortableTableHeader";
import { FavoriteTableHeader } from "./FavoriteTableHeader";
import type { Dog } from "../api/dogApi";

const SORTABLE_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "breed", label: "Breed" },
];

interface DogTableProps {
  dogs: Dog[];
  favouriteIds: string[];
  isAllFavourited: boolean;
  handleToggleAllFavourites: () => void;
  handleToggleFavourite: (id: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
}

export function DogTable({
  dogs,
  favouriteIds,
  isAllFavourited,
  handleToggleAllFavourites,
  handleToggleFavourite,
  sortField,
  sortDirection,
  handleSort,
}: DogTableProps) {
  return (
    <table className="table w-full max-w-3xl border border-base-300 rounded-3xl overflow-hidden shadow-lg mt-4">
      <thead>
        <tr className="bg-base-200">
          <FavoriteTableHeader
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
          dogs.map((dog) => (
            <DogRow
              key={dog.id}
              dog={dog}
              isFavourite={favouriteIds.includes(dog.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
      </tbody>
    </table>
  );
}
