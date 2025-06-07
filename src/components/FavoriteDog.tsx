import { BreedBadge } from "./BreedBadge";
import type { Dog } from "../api/dogApi";

interface FavoriteDogProps {
  dog: Dog;
  onRemove: (id: string) => void;
}

export function FavoriteDog({ dog, onRemove }: FavoriteDogProps) {
  return (
    <li className="flex items-center gap-3 bg-base-100 rounded-xl shadow p-2">
      <img
        src={dog.img}
        alt={dog.name}
        className="w-12 h-12 rounded object-cover"
      />
      <div className="flex-1">
        <div className="font-semibold text-base flex items-center gap-2">
          {dog.name}
          <div className="text-sm text-gray-500">Age: {dog.age}</div>
        </div>
        <BreedBadge breed={dog.breed} />
      </div>
      <button
        className="btn btn-circle btn-sm btn-error text-white"
        aria-label={`Remove ${dog.name} from favorites`}
        onClick={() => onRemove(dog.id)}
        type="button"
      >
        ×
      </button>
    </li>
  );
}

export default FavoriteDog;
