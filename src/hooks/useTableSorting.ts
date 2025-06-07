import { useSearchParams } from "react-router";
import { useCallback, useEffect } from "react";

export function useTableSorting() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = searchParams.get("sortField") || "breed";
  const sortDirection = searchParams.get("sortDirection") === "desc" ? "desc" : "asc";

  // Ensure sortField and sortDirection are present in params on initial load
  useEffect(() => {
    let changed = false;
    const newParams = { ...Object.fromEntries(searchParams) };
    if (!searchParams.get("sortField")) {
      newParams.sortField = sortField;
      changed = true;
    }
    if (!searchParams.get("sortDirection")) {
      newParams.sortDirection = sortDirection;
      changed = true;
    }
    if (changed) {
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams, sortField, sortDirection]);

  const handleSort = useCallback(
    (field: string) => {
      let direction = "asc";
      if (sortField === field) {
        direction = sortDirection === "asc" ? "desc" : "asc";
      }
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sortField: field,
        sortDirection: direction,
      });
    },
    [sortField, sortDirection, searchParams, setSearchParams]
  );

  return { sortField, sortDirection, handleSort };
}
