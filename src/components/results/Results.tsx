import cn from 'classnames';
import { FC, useContext, useEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import { BookSearchResponse } from '../../api/models';
import { Card } from '../Card';
import { ErrorContext } from '../ErrorBoundary';
import { Loader } from '../Loader';
import { ResultsCard } from '../results-card/ResultsCard';

export interface ResultsProps {
  response: BookSearchResponse | null;
  isLoading: boolean;
}

export const Results: FC<ResultsProps> = ({ response, isLoading }) => {
  const { error } = useContext(ErrorContext);
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

  const ErrorDisplay = error && (
    <h2 className="text-base/7 font-semibold text-red-600">
      ❌ {error.message}
    </h2>
  );

  const LoaderDisplay = isLoading && <Loader />;

  const Books =
    response?.docs.length &&
    response.docs.map((book, i, arr) => (
      <ResultsCard
        key={book.key}
        book={book}
        className={cn({
          'pt-0': i === 0,
          'pb-0': i === arr.length - 1,
          'border-b border-gray-200': i !== arr.length - 1,
        })}
      />
    ));

  const NoContent = (
    <h2 className="text-base/7 font-semibold">No content 🤷</h2>
  );

  return (
    <div className="flex gap-6">
      <div ref={resultsCardRef} className="grow shrink-0 max-w-full">
        <Card>{ErrorDisplay || LoaderDisplay || Books || NoContent}</Card>
      </div>
      <div ref={detailsCardRef} className="h-full empty:hidden min-w-0">
        <Outlet />
      </div>
    </div>
  );
};
