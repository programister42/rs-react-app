import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { BookSearchResponse } from '../api/models';
import { safeFetch } from '../api/safe-fetch';
import { OPEN_LIBRARY_SEARCH_API } from '../api/urls';
import { ErrorContext } from '../components/ErrorBoundary';
import { ErrorButton } from '../components/ErrorButton';
import { Pagination } from '../components/Pagination';
import { Results } from '../components/Results';
import { TopControls } from '../components/TopControls';

const PAGE_SIZE = 5;

export function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<BookSearchResponse | null>(null);
  const { error, setError } = useContext(ErrorContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pages = response?.num_found ?? 0 / PAGE_SIZE;
  const currentPage = Number(searchParams.get('page') ?? 1);

  useEffect(() => {
    const handleSearch = async () => {
      setError(null);
      setIsLoading(true);

      const reqSearchParams = new URLSearchParams(searchParams);
      reqSearchParams.append('limit', PAGE_SIZE.toString());

      const url = `${OPEN_LIBRARY_SEARCH_API}?${reqSearchParams}`;

      const { error, data } = await safeFetch<BookSearchResponse>(url);

      if (error) setError(error);
      else {
        setResponse(data);
        setIsLoading(false);
      }
    };

    handleSearch();

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
      setResponse(null);
      navigate('/search');
    }
  }, [error, navigate]);

  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-center text-base/7 font-semibold text-indigo-600">
          Open Library
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          Search Your Favorite Books
        </h1>
        <p className="mt-2 text-lg/8 text-gray-600">
          Search for your favorite books and authors from the Open Library
        </p>
      </div>
      <div className="mx-auto mt-16 flex max-w-xl flex-col gap-6 sm:mt-20">
        <TopControls isLoading={isLoading} />
        <Results response={response} isLoading={isLoading} />
        {pages > 1 && (
          <Pagination
            pages={pages}
            currentPage={currentPage}
            className="mx-auto"
          />
        )}
        <ErrorButton className="mx-auto" />
      </div>
    </>
  );
}
