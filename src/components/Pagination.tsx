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
    <div className="flex items-center gap-2 justify-center my-4 sticky bottom-4 z-50 bg-base-100 shadow-[0_-0_8px_0_rgba(0,0,0,0.7)] p-4 rounded-3xl">
      <button
        className="btn btn-md hover:btn-primary rounded-3xl"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ⬅️ Prev
      </button>
      <button
        className="btn btn-md hover:btn-primary rounded-3xl"
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
        className="input input-md w-16 text-center mx-2 focus:input-primary"
        aria-label="Go to page"
      />
      <button
        className="btn btn-md hover:btn-primary rounded-3xl"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        {totalPages}
      </button>
      <button
        className="btn btn-md hover:btn-primary rounded-3xl"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next ➡️
      </button>
    </div>
  );
}
