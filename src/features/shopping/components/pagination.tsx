const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 2 && currentPage > 3) {
        pages.push('...');
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pages.push('...');
      } else {
        pages.push(i);
      }
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Remove duplicates and ellipsis if not needed
    return Array.from(new Set(pages));
  };

  return (
    <div className="mb-8 mt-12 flex justify-center">
      <div className="flex items-center space-x-2">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="flex size-10 items-center justify-center border border-gray-300 hover:bg-gray-100"
          >
            &lt;
          </button>
        )}

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === 'number' ? onPageChange(page) : null
            }
            className={`flex size-10 items-center justify-center ${
              page === currentPage
                ? 'bg-red-500 text-white'
                : page === '...'
                  ? 'cursor-default'
                  : 'border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="flex size-10 items-center justify-center border border-gray-300 hover:bg-gray-100"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
