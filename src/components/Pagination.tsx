import { useState } from "react";

interface PaginationProps {
  currentPage: number; // 1-based
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [inputPage, setInputPage] = useState<number>(currentPage);

  function handlePageChange(page: number) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      setInputPage(page);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setInputPage(currentPage);
    } else {
      const num = Number(value);
      if (!isNaN(num) && num >= 1 && num <= totalPages) {
        setInputPage(num);
      }
    }
  }

  function handleInputBlur() {
    if (typeof inputPage === "number" && inputPage !== currentPage) {
      handlePageChange(inputPage);
    } else {
      setInputPage(currentPage);
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (
      e.key === "Enter" &&
      typeof inputPage === "number" &&
      inputPage !== currentPage
    ) {
      handlePageChange(inputPage);
    }
  }

  return (
    <div className="flex items-center gap-2 justify-center my-4">
      <button
        className="btn btn-sm btn-outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ⬅️
      </button>
      <button
        className="btn btn-sm btn-outline"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        1
      </button>
      <input
        type="number"
        min={1}
        max={totalPages}
        value={inputPage}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        className="input input-sm input-bordered w-16 text-center mx-2"
        aria-label="Go to page"
      />
      <button
        className="btn btn-sm btn-outline"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        {totalPages}
      </button>
      <button
        className="btn btn-sm btn-outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ➡️
      </button>
    </div>
  );
}
