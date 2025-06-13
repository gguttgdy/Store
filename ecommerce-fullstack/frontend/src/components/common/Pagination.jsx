import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5 
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav aria-label="Pagination Navigation">
      <ul className="pagination justify-content-center">
        {showFirstLast && currentPage > 1 && (
          <li className="page-item">
            <button 
              className="page-link"
              onClick={() => onPageChange(1)}
              aria-label="Go to first page"
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
          </li>
        )}

        {showPrevNext && currentPage > 1 && (
          <li className="page-item">
            <button 
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Go to previous page"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
        )}

        {visiblePages[0] > 1 && (
          <>
            <li className="page-item">
              <button 
                className="page-link"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
            </li>
            {visiblePages[0] > 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {visiblePages.map(page => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button 
              className="page-link"
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button 
                className="page-link"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {showPrevNext && currentPage < totalPages && (
          <li className="page-item">
            <button 
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="Go to next page"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        )}

        {showFirstLast && currentPage < totalPages && (
          <li className="page-item">
            <button 
              className="page-link"
              onClick={() => onPageChange(totalPages)}
              aria-label="Go to last page"
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
