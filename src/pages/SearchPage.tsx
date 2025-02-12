import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BookSearchResponse } from '../api/models';
import { safeFetch } from '../api/safe-fetch';
import { OPEN_LIBRARY_SEARCH_API } from '../api/urls';
import { ErrorContext } from '../components/ErrorBoundary';
import { ErrorButton } from '../components/ErrorButton';
import { Results } from '../components/Results';
import { TopControls } from '../components/TopControls';

const PAGE_SIZE = 5;

export function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<BookSearchResponse | null>(null);
  const { error, setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setIsLoading(false);
      setResponse(null);
      navigate('/search');
    }
  }, [error, navigate]);

  const handleSearch = async (search: string) => {
    search ||= 'aa';

    setError(null);
    setIsLoading(true);

    const q = encodeURIComponent(search);
    const searchParams = new URLSearchParams({
      q,
      limit: PAGE_SIZE.toString(),
    });
    const url = `${OPEN_LIBRARY_SEARCH_API}?${searchParams}`;

    const { error, data } = await safeFetch<BookSearchResponse>(url);

    if (error) setError(error);
    else {
      setResponse(data);
      setIsLoading(false);
    }
  };

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
        <TopControls onSearch={handleSearch} isLoading={isLoading} />
        <Results response={response} isLoading={isLoading} />
        <ErrorButton className="ml-auto" />
      </div>
    </>
  );
}
