import cn from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { NavLink, Outlet } from 'react-router';
import { BookSearchResponse } from '../api/models';
import { useSearchParamsString } from '../hooks/useSearchParamsString';
import { Card } from './Card';
import { ErrorContext } from './ErrorBoundary';
import { Loader } from './Loader';

interface ResultsProps {
  response: BookSearchResponse | null;
  isLoading: boolean;
}

export function Results({ response, isLoading }: ResultsProps) {
  const { error } = useContext(ErrorContext);
  const searchParamsString = useSearchParamsString();
  const resultsCardRef = useRef<HTMLDivElement>(null);
  const detailsCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (resultsCardRef.current && detailsCardRef.current) {
        const leftHeight = resultsCardRef.current.offsetHeight;
        detailsCardRef.current.style.height = `${leftHeight}px`;
      }
    };

    adjustHeight();

    window.addEventListener('resize', adjustHeight);

    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  });

  const Error = error && (
    <h2 className="text-base/7 font-semibold text-red-600">
      ❌ {error.message}
    </h2>
  );

  const ShowLoader = isLoading && <Loader />;

  const Books =
    response?.docs.length &&
    response.docs.map((book, i, arr) => {
      const booksLength = arr.length;
      const isFirst = i === 0;
      const isLast = booksLength && i === booksLength - 1;
      return (
        <NavLink
          to={`.${book.key}${searchParamsString}`}
          key={book.key}
          className={cn(
            'group flex py-4 cursor-pointer justify-between items-center',
            {
              'pt-0': isFirst,
              'pb-0': isLast,
              'border-b border-gray-200': !isLast,
            }
          )}
        >
          <div className="flex flex-col">
            <h3 className="text-sm/6 font-semibold text-gray-900 group-hover:text-indigo-600">
              📖&nbsp;{book.title}
            </h3>
            {book.author_name && (
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                {book.author_name.length > 1 ? '👥' : '👤'}&nbsp;
                {book.author_name.join(', ')}
              </p>
            )}
          </div>
          <span className={'invisible text-lg group-hover:visible'}>👉</span>
        </NavLink>
      );
    });

  const NoContent = (
    <h2 className="text-base/7 font-semibold">No content 🤷</h2>
  );

  return (
    <div className="flex gap-6">
      <div ref={resultsCardRef} className="grow shrink-0 max-w-full">
        <Card>{Error || ShowLoader || Books || NoContent}</Card>
      </div>
      <div ref={detailsCardRef} className="h-full empty:hidden min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
