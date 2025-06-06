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
            <span aria-label="sorted ascending">⬆️</span>
          )}
          {sortDirection === "desc" && (
            <span aria-label="sorted descending">⬇️</span>
          )}
        </span>
      </button>
    </th>
  );
}
