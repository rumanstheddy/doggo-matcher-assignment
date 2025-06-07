import type { Dog } from "../api/dogApi";
import { BreedBadge } from "./BreedBadge";

interface DogRowProps {
  dog: Dog;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
}

export function DogRow({ dog, isFavourite, onToggleFavourite }: DogRowProps) {
  return (
    <tr>
      <td className="px-4 py-2 w-16 text-center">
        <button
          className={`btn btn-circle btn-sm mx-auto ${
            isFavourite
              ? "bg-primary text-white"
              : "bg-base-200 text-base-content"
          }`}
          onClick={() => onToggleFavourite(dog.id)}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavourite ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="size-[1.1em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </td>
      <td className="flex items-center gap-2 xl:pl-14 pr-4 py-2 w-32 sm:w-36 md:w-40 lg:w-48 xl:w-56">
        <img
          src={dog.img}
          alt={dog.name}
          className="w-10 h-10 rounded object-cover"
        />
        {dog.name}
      </td>
      <td className="pr-4 pl-6 py-2 w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40">
        {dog.age}
      </td>
      <td className="px-4 py-2 w-32 sm:w-36 md:w-40 lg:w-48 xl:w-56">
        <BreedBadge breed={dog.breed} />
      </td>
      <td className="px-4 py-2 w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44">
        {dog.zip_code}
      </td>
    </tr>
  );
}
