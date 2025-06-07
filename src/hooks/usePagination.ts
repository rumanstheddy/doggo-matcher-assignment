import { useSearchParams } from "react-router";
import { useEffect } from "react";

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Ensure default pagination params on first load
  useEffect(() => {
    const newParams: Record<string, string> = {
      ...Object.fromEntries(searchParams),
    };
    let changed = false;
    if (!searchParams.get("from")) {
      newParams.from = "0";
      changed = true;
    }
    if (!searchParams.get("size")) {
      newParams.size = "25";
      changed = true;
    }
    if (changed) {
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams]);

  let size = Number(searchParams.get("size") || 25);
  if (size > 100) {
    size = 100;
    if (searchParams.get("size") && Number(searchParams.get("size")) > 100) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        size: "100",
      });
    }
  }
  const from = Number(searchParams.get("from") || 0);

  function handlePaginationChange(page: number, newSize?: number) {
    const sizeToUse = newSize ?? size;
    setSearchParams({
      ...Object.fromEntries(searchParams),
      from: ((page - 1) * sizeToUse).toString(),
      size: sizeToUse.toString(),
    });
  }

  return {
    size,
    from,
    handlePaginationChange,
  };
}
