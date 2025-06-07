import { breedColorMap } from "../api/constants/breedColors";
import type { DogBreed } from "../types/breeds";

interface BreedBadgeProps {
  breed: string;
}

export function BreedBadge({ breed }: BreedBadgeProps) {
  // Type assertion is safe if breed comes from DogBreed, fallback to neutral if not
  const badgeClass = breedColorMap[breed as DogBreed] || "badge-neutral";
  return (
    <span className={`badge badge-outline ${badgeClass} text-xs whitespace-nowrap`}>{breed}</span>
  );
}
