import { useRef } from "react";
import FavoritesButton from "./FavoritesButton";
import FavoriteDogList from "./FavoriteDogList";
import { useFavorites } from "../hooks/useFavorites";

export function FavoritesSideBar() {
  // Use a ref to control the drawer checkbox
  const drawerRef = useRef<HTMLInputElement>(null);
  const { handleToggleFavourite, favouriteIds, removeAllFavourites } = useFavorites();

  // Handler to open the drawer
  const openDrawer = () => {
    if (drawerRef.current) drawerRef.current.checked = true;
  };
  // Handler to close the drawer
  const closeDrawer = () => {
    if (drawerRef.current) drawerRef.current.checked = false;
  };

  return (
    <div className="drawer drawer-end">
      <input
        id="favorites-drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerRef}
      />
      <div className="drawer-content">
        {/* The button toggles the drawer by clicking the label */}
        <label htmlFor="favorites-drawer" className="cursor-pointer">
          <FavoritesButton onClick={openDrawer} />
        </label>
      </div>
      <div className="drawer-side z-[100]">
        <label
          htmlFor="favorites-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={closeDrawer}
        ></label>
        <div className="relative bg-base-200 text-base-content min-h-full w-90 p-4">
          {/* Close button in the top right of the sidebar */}
          <button
            className="btn btn-sm btn-circle text-2xl hover:btn-error hover:text-white pb-1 absolute top-4 right-4"
            aria-label="Close sidebar"
            onClick={closeDrawer}
            type="button"
          >
            ×
          </button>
          <ul className="menu">
            <li className="font-bold text-lg mb-2 flex flex-row items-center justify-between">
              <span>Your Favorites</span>
              <button
              // btn hover:btn-error text-base-content flex items-center gap-2 
                className="btn btn-sm btn-error ml-2 hover:text-white rounded-3xl"
                onClick={removeAllFavourites}
                disabled={favouriteIds.length === 0}
                type="button"
              >
                Clear all
              </button>
            </li>
          </ul>
          <FavoriteDogList onRemove={handleToggleFavourite} />
        </div>
      </div>
    </div>
  );
}

export default FavoritesSideBar;
