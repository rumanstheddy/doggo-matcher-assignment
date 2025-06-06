export type SortDirection = "asc" | "desc" | undefined;

interface SortableTableHeaderProps {
  label: string;
  sortDirection: SortDirection;
  onClick: () => void;
}

export function SortableTableHeader({
  label,
  sortDirection,
  onClick,
}: SortableTableHeaderProps) {
  return (
    <th
      className={`${
        label === "Name" ? "xl:pl-14 pr-4" : "px-4"
      } py-2 w-32 sm:w-36 md:w-40 lg:w-48 xl:w-56`}
    >
      <button
        type="button"
        className={`flex items-center gap-1 font-bold focus:outline-none min-w-[80px] cursor-pointer border border-base-300 rounded transition-colors hover:text-primary
          ${sortDirection ? "text-primary" : ""}`}
        onClick={onClick}
      >
        <span>{label}</span>
        {/* Reserve space for the arrow, even if not shown */}
        <span className="inline-block w-4 text-center">
          {sortDirection === "asc" && (
            <span aria-label="sorted ascending">🔼</span>
          )}
          {sortDirection === "desc" && (
            <span aria-label="sorted descending">🔽</span>
          )}
        </span>
      </button>
    </th>
  );
}

// Add a new header for the favourite button
export function FavouriteTableHeader({
  onClick,
  isAllFavourited,
}: {
  onClick: () => void;
  isAllFavourited: boolean;
}) {
  return (
    <th className="px-4 py-2 w-16 text-center">
      <button
        type="button"
        className={`btn btn-circle btn-sm mx-auto ${
          isAllFavourited
            ? "bg-primary text-white"
            : "bg-base-200 text-base-content"
        }`}
        onClick={onClick}
        aria-label={isAllFavourited ? "Unfavourite all" : "Favourite all"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isAllFavourited ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="inline size-[1.2em]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
    </th>
  );
}
