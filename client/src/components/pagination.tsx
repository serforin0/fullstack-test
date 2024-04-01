import React from 'react';
import './pagination.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, handlePagination }) => {
  const renderPageNumbers = () => {
    const pages = [];

    // Logic to determine which page numbers to display
    // You can customize this based on your requirements
    for (let i = 1; i <= totalPages; i++) {
        if((i >= page - 2 && i > 0) && (i <= page + 2 && i <= totalPages)){
            pages.push(
                <button
                key={i}
                className={`${'pageItem'} ${page === i ? 'active' : ''}`}
                onClick={() => handlePagination(i)}
                >
                {i}
                </button>
            );
        }
    }

    return pages;
  };

  return (
    <div className={"paginationWrapper"}>
      {/* Previous button */}
      {page > 1 && (
        <button className={"sides"} onClick={() => handlePagination(page - 1)}>
          &lt;
        </button>
      )}

      {/* Page numbers */}
      {renderPageNumbers()}

      {/* Next button */}
      {page < totalPages && (
        <button className={"sides"} onClick={() => handlePagination(page + 1)}>
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
