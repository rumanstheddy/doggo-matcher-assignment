import { useFavorites } from "../hooks/useFavorites";
import { useEffect, useState } from "react";

interface FavoritesButtonProps {
  onClick: () => void;
}

export function FavoritesButton({ onClick }: FavoritesButtonProps) {
  const { favouriteIds } = useFavorites();
  const [count, setCount] = useState(favouriteIds.length);

  useEffect(() => {
    setCount(favouriteIds.length);
  }, [favouriteIds]);

  return (
    <div className="fixed right-24 bottom-9 z-50 indicator">
      {count > 0 && (
        <span className="indicator-item badge badge-error">
          {count}
        </span>
      )}
      <button
        className="btn btn-circle btn-primary shadow-lg hover:scale-105 transition-transform"
        onClick={onClick}
        aria-label="Show favorites"
        type="button"
      >
        <span className="text-xl">❤️</span>
      </button>
    </div>
  );
}

export default FavoritesButton;
