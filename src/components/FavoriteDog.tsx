import { BreedBadge } from "./BreedBadge";
import type { Dog } from "../interfaces/dog";
import CloseIconButton from "./CloseIconButton";

interface FavoriteDogProps {
  dog: Dog;
  onRemove: (id: string) => void;
}

export function FavoriteDog({ dog, onRemove }: FavoriteDogProps) {
  return (
    <li className="indicator card bg-base-100 shadow-xl border border-base-200 flex flex-row items-center gap-6 p-4 min-h-[5.5rem] min-w-[260px]">
      <div className="indicator-item indicator-top right-2">
        <CloseIconButton
          className="btn btn-xs btn-circle btn-error text-white hover:scale-105 transition-transform text-lg pb-1"
          onClick={() => onRemove(dog.id)}
          aria-label="Close"
        />
      </div>
      <img
        src={dog.img}
        alt={dog.name}
        className="w-16 h-16 rounded-xl object-cover border border-base-300"
      />
      <div className="flex-1 min-w-0 flex flex-col gap-1 w-full">
        <div className="font-semibold text-lg flex items-center gap-2">
          {dog.name}
          <span className="text-sm text-gray-500">Age: {dog.age}</span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <BreedBadge breed={dog.breed} />
        </div>
      </div>
    </li>
  );
}

export default FavoriteDog;
