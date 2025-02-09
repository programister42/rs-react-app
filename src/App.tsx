import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchPage } from './pages/SearchPage';

export default function App() {
  return (
    <ErrorBoundary>
      <SearchPage />
    </ErrorBoundary>
  );
}
