import { useState, useEffect } from "react";

function getLocalStorageFavKey() {
  const name = localStorage.getItem("userName") || "default";
  const email = localStorage.getItem("userEmail") || "default";
  return `favouriteDogIds_${name}_${email}`;
}

function getLocalStorageFavourites() {
  return JSON.parse(localStorage.getItem(getLocalStorageFavKey()) || "[]");
}

function setLocalStorageFavourites(ids: string[]) {
  localStorage.setItem(getLocalStorageFavKey(), JSON.stringify(ids));
}

export function useFavorites(allIds: string[] = []) {
  const [favouriteIds, setFavouriteIds] = useState<string[]>(
    getLocalStorageFavourites()
  );

  // Listen for localStorage changes (cross-tab and same-tab)
  useEffect(() => {
    const key = getLocalStorageFavKey();
    function syncFavourites(e?: StorageEvent) {
      // Only update if the right key changes (or if polling)
      if (!e || e.key === key) {
        setFavouriteIds(getLocalStorageFavourites());
      }
    }
    window.addEventListener("storage", syncFavourites);
    // Poll for same-tab changes
    const interval = setInterval(() => syncFavourites(), 500);
    return () => {
      window.removeEventListener("storage", syncFavourites);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setFavouriteIds(getLocalStorageFavourites());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allIds)]);

  const isAllFavourited =
    allIds.length > 0 && allIds.every((id) => favouriteIds.includes(id));

  function handleToggleAllFavourites() {
    if (isAllFavourited) {
      // Remove all current page dogs from favourites
      const updated = favouriteIds.filter((id) => !allIds.includes(id));
      setLocalStorageFavourites(updated);
      setFavouriteIds(updated);
    } else {
      // Add all current page dogs to favourites
      const updated = Array.from(new Set([...favouriteIds, ...allIds]));
      setLocalStorageFavourites(updated);
      setFavouriteIds(updated);
    }
  }

  function handleToggleFavourite(id: string) {
    let updated;
    if (favouriteIds.includes(id)) {
      updated = favouriteIds.filter((favId) => favId !== id);
    } else {
      updated = [...favouriteIds, id];
    }
    setLocalStorageFavourites(updated);
    setFavouriteIds(updated);
  }

  return {
    favouriteIds,
    isAllFavourited,
    handleToggleAllFavourites,
    handleToggleFavourite,
  };
}
