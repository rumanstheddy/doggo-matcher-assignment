import React, { useState } from "react";
import { DogRow } from "./DogRow";
import { SortableTableHeader } from "./SortableTableHeader";
import { FavoriteTableHeader } from "./FavoriteTableHeader";
import DogCard from "./DogCard";
import type { Dog } from "../interfaces/dog";
import type { Location } from "../interfaces/location";

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
  getLocation?: (dog: Dog) => Location;
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
  getLocation,
}: DogTableProps) {
  const [hoveredDogId, setHoveredDogId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleMouseEnter = (dogId: string) => (e: React.MouseEvent) => {
    setHoveredDogId(dogId);
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseLeave = () => {
    setHoveredDogId(null);
    setMousePos(null);
  };

  const hoveredDog = hoveredDogId
    ? dogs.find((d) => d.id === hoveredDogId)
    : null;
  const hoveredLocation =
    hoveredDog && getLocation ? getLocation(hoveredDog) : undefined;

  return (
    <div className="relative">
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
            <th className="py-2 w-32 sm:w-36 md:w-40 lg:w-48 xl:w-56">
              Zip Code
            </th>
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
                onDogHover={handleMouseEnter(dog.id)}
                onDogHoverLeave={handleMouseLeave}
              />
            ))}
        </tbody>
      </table>
      {hoveredDog && mousePos && (
        <div
          className="fixed z-100 pointer-events-none w-80 max-w-[90vw] max-h-[90vh]"
          style={{
            left: Math.min(mousePos.x + 24, window.innerWidth - 340), //? 340 = card width + margin
            top: Math.min(
              Math.max(mousePos.y - 24, 0),
              window.innerHeight - 420
            ), //? 420 = card height + margin
          }}
        >
          <DogCard dog={hoveredDog} location={hoveredLocation} />
        </div>
      )}
    </div>
  );
}
