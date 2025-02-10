import { useContext } from 'react';
import { BookSearchResponse } from '../api/models';
import { ErrorContext } from './ErrorBoundary';

interface ResultsProps {
  response: BookSearchResponse | null;
  isLoading: boolean;
}

export function Results({ response, isLoading }: ResultsProps) {
  const { error } = useContext(ErrorContext);

  const Error = error && (
    <h2 className="text-base/7 font-semibold text-red-600">
      ❌ {error.message}
    </h2>
  );

  const Loader = isLoading && (
    <h2 className="animate-pulse text-base/7 font-semibold">Loading...</h2>
  );

  const Books =
    response?.docs.length &&
    response.docs.map((book, i, arr) => {
      const booksLength = arr.length;
      const isFirst = i === 0;
      const isLast = booksLength && i === booksLength - 1;
      return (
        <li
          key={book.key}
          className={`flex flex-col py-4${isFirst ? ' pt-0' : ''}${isLast ? ' pb-0' : ''}${!isLast ? ' border-b border-gray-200' : ''}`}
        >
          <h3 className="text-lg font-medium tracking-tight text-gray-950">
            📖&nbsp;{book.title}
          </h3>
          {book.author_name && (
            <p className="text-sm/6 text-gray-600 ">
              {book.author_name.length > 1 ? '👥' : '👤'}&nbsp;
              {book.author_name.join(', ')}
            </p>
          )}
        </li>
      );
    });

  const NoContent = (
    <h2 className="text-base/7 font-semibold">No content 🤷</h2>
  );

  return (
    <ul className="inset-px flex h-full flex-col overflow-hidden rounded-lg bg-white p-8 ring-1 shadow-sm ring-black/5 sm:p-10">
      {Error || Loader || Books || NoContent}
    </ul>
  );
}
