import { useQuery } from "@tanstack/react-query";
import { getDogsByIds } from "../api/dogApi";
import { useFavorites } from "../hooks/useFavorites";
import FavoriteDog from "./FavoriteDog";

interface FavoritesDogListProps {
  onRemove: (id: string) => void;
}

export function FavoriteDogList({ onRemove }: FavoritesDogListProps) {
  const { favouriteIds } = useFavorites([]); // Only subscribe to real-time updates

  const {
    data: dogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favoriteDogs", favouriteIds],
    queryFn: () =>
      favouriteIds.length > 0 ? getDogsByIds(favouriteIds) : Promise.resolve([]),
    enabled: Array.isArray(favouriteIds),
    staleTime: 1000 * 60, // 1 minute
  });

  if (isLoading) return <div className="p-4">Loading favorites...</div>;
  if (error) return <div className="p-4 text-error">{(error as Error).message}</div>;
  if (!dogs || dogs.length === 0)
    return <div className="p-4 text-gray-400">No favorites yet.</div>;

  return (
    <ul className="flex flex-col gap-4 p-2">
      {dogs.map((dog) => (
        <FavoriteDog key={dog.id} dog={dog} onRemove={onRemove} />
      ))}
    </ul>
  );
}

export default FavoriteDogList;
