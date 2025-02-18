import { useLocation } from 'react-router';

export function useSearchParamsString() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search).toString();
  const searchParamsString = searchParams ? `?${searchParams}` : '';
  return searchParamsString;
}
