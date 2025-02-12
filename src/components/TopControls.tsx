import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Spinner } from './Spinner';

interface TopControlsProps {
  isLoading: boolean;
}

const LS_SEARCH = 'SEARCH';

export function TopControls({ isLoading }: TopControlsProps) {
  const [search, setSearch] = useLocalStorage(LS_SEARCH, '');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('q', search || 'aa');
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = async () => {
    const trimmedSearch = search.trim();
    setSearch(trimmedSearch);
  };

  return (
    <div className="flex gap-6">
      <input
        type="text"
        placeholder="Search..."
        autoComplete="search"
        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        className="flex gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleSearch}
      >
        <span>Search</span>
        <span>
          {isLoading ? <Spinner className="size-5 text-white" /> : '🔍'}
        </span>
      </button>
    </div>
  );
}
