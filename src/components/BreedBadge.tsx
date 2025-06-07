import { breedColorMap } from "../api/constants/breedColors";
import type { DogBreed } from "../types/breeds";

interface BreedBadgeProps {
  breed: string;
  removable?: boolean;
  onRemove?: () => void;
}

export function BreedBadge({ breed, removable, onRemove }: BreedBadgeProps) {
  const badgeClass = breedColorMap[breed as DogBreed] || "badge-neutral";
  return (
    <span
      className={`badge badge-outline ${badgeClass} text-xs whitespace-nowrap flex items-center gap-1`}
    >
      {breed}
      {removable && (
        <button
          type="button"
          className="ml-1 text-lg leading-none hover:text-error focus:outline-none cursor-pointer"
          onClick={onRemove}
          tabIndex={0}
          aria-label={`Remove ${breed}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
