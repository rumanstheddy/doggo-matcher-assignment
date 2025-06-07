import { useRef } from "react";
import FavoritesButton from "./FavoritesButton";
import FavoriteDogList from "./FavoriteDogList";
import { useFavorites } from "../hooks/useFavorites";

export function FavoritesSideBar() {
  // Use a ref to control the drawer checkbox
  const drawerRef = useRef<HTMLInputElement>(null);
  const { handleToggleFavourite } = useFavorites();

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
        <div className="relative bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Close button in the top right of the sidebar */}
          <button
            className="btn btn-circle text-2xl hover:btn-error pb-1 absolute top-2 right-2"
            aria-label="Close sidebar"
            onClick={closeDrawer}
            type="button"
          >
            ×
          </button>
          <ul className="menu">
            <li className="font-bold text-lg mb-2">Your Favorites</li>
          </ul>
          <FavoriteDogList onRemove={handleToggleFavourite} />
        </div>
      </div>
    </div>
  );
}

export default FavoritesSideBar;
