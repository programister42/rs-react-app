import cn from 'classnames';
import { NavLink, useSearchParams } from 'react-router';

interface PaginationProps {
  pages: number;
  currentPage: number;
  className?: string;
}

const MAX_DISPLAY_PAGES = 7;

export function Pagination({ pages, currentPage, className }: PaginationProps) {
  const [searchParams] = useSearchParams();

  const halfDisplayPagesBetweenDots = Math.floor((MAX_DISPLAY_PAGES - 4) / 2);
  const minAfterDots = currentPage - halfDisplayPagesBetweenDots;
  const maxAfterDots = currentPage + halfDisplayPagesBetweenDots;

  const pagesArr = Array.from({ length: pages }, (_, i) => i + 1);
  const displayPages: Array<number | null> = [];

  const getUrlParamsWithPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    return `?${newSearchParams}`;
  };

  pagesArr.forEach((page, i) => {
    if (i === 0 || page === pages) return displayPages.push(page);

    if (i === 1) return displayPages.push(currentPage < 4 ? page : null);

    if (page >= minAfterDots && page <= maxAfterDots)
      return displayPages.push(page);

    if (page === maxAfterDots + 1)
      return displayPages.push(currentPage === pages - 1 ? page : null);
  });

  return (
    <div className={className}>
      <nav
        aria-label="Pagination"
        className="isolate inline-flex -space-x-px rounded-md shadow-xs"
      >
        {currentPage !== 1 && (
          <NavLink
            to={getUrlParamsWithPage(currentPage - 1)}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>←
          </NavLink>
        )}
        {displayPages.map((pageNumber, i) =>
          pageNumber ? (
            <NavLink
              key={i}
              to={getUrlParamsWithPage(pageNumber)}
              className={cn({
                'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
                  pageNumber === currentPage,
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                  pageNumber !== currentPage,
                'rounded-l-md': currentPage === 1 && pageNumber === 1,
                'rounded-r-md': currentPage === pages && pageNumber === pages,
              })}
            >
              {pageNumber}
            </NavLink>
          ) : (
            <span
              key={i}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
            >
              ...
            </span>
          )
        )}
        {currentPage !== pages && (
          <NavLink
            to={getUrlParamsWithPage(currentPage + 1)}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>→
          </NavLink>
        )}
      </nav>
    </div>
  );
}
