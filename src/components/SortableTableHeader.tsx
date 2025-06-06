export type SortDirection = "asc" | "desc" | undefined;

interface SortableTableHeaderProps {
  label: string;
  sortDirection: SortDirection;
  onClick: () => void;
}

export function SortableTableHeader({ label, sortDirection, onClick }: SortableTableHeaderProps) {
  return (
    <th>
      <button
        type="button"
        className="flex items-center gap-1 font-bold focus:outline-none min-w-[80px] justify-center"
        onClick={onClick}
      >
        <span>{label}</span>
        {/* Reserve space for the arrow, even if not shown */}
        <span className="inline-block w-4 text-center">
          {sortDirection === "asc" && <span aria-label="sorted ascending">▲</span>}
          {sortDirection === "desc" && <span aria-label="sorted descending">▼</span>}
        </span>
      </button>
    </th>
  );
}
