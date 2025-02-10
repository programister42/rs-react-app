import { useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Spinner } from './Spinner';

interface TopControlsProps {
  onSearch: (search: string) => unknown;
  isLoading: boolean;
}

const LS_SEARCH = 'SEARCH';

export function TopControls({ onSearch, isLoading }: TopControlsProps) {
  const [search, setSearch] = useLocalStorage(LS_SEARCH, '');
  const initialSearchRef = useRef(search);
  const initialOnSearchFnRef = useRef(onSearch);

  useEffect(() => {
    const initialSearch = initialSearchRef.current;
    const initialOnSearchFn = initialOnSearchFnRef.current;
    initialOnSearchFn(initialSearch.trim());
  }, []);

  const handleSearch = async () => {
    onSearch(search.trim());
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
