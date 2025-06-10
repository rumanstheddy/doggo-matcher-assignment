import { useRef } from "react";
import FavoritesButton from "./FavoritesButton";
import FavoriteDogList from "./FavoriteDogList";
import { useFavorites } from "../hooks/useFavorites";
import { useCloseOnBlurOrEscape } from "../hooks/useCloseOnBlurOrEscape";
import CloseIconButton from "./CloseIconButton";

export function FavoritesSideBar() {
  // Use a ref to control the drawer checkbox
  const drawerToggleRef = useRef<HTMLInputElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  const { handleToggleFavourite, favouriteIds, removeAllFavourites } =
    useFavorites();

  // Handler to open the drawer
  const openDrawer = () => {
    if (drawerToggleRef.current) drawerToggleRef.current.checked = true;
  };
  // Handler to close the drawer
  const closeDrawer = () => {
    if (drawerToggleRef.current) drawerToggleRef.current.checked = false;
  };

  // Add close on blur or escape functionality
  useCloseOnBlurOrEscape(sidebarContentRef, closeDrawer);

  return (
    <div className="drawer drawer-end">
      <input
        id="favorites-drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerToggleRef}
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
        <div
          ref={sidebarContentRef}
          className="relative bg-base-200 text-base-content min-h-full w-90 p-4"
        >
          {/* Close button in the top right of the sidebar */}
          <CloseIconButton
            className="absolute top-4 right-4 btn btn-sm btn-circle text-2xl btn-error text-white pb-1 hover:scale-105"
            aria-label="Close sidebar"
            onClick={closeDrawer}
          />
          <ul className="menu">
            <li className="font-bold text-lg mb-2 flex flex-row items-center justify-between">
              <span className="cursor-default hover:bg-transparent focus:bg-transparent active:bg-transparent">
                Your Favorites
              </span>
              <button
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
