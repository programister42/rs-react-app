import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FancyBackground } from './components/FancyBackground';
import './index.css';
import { DetailsPage } from './pages/DetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import { SearchPage } from './pages/SearchPage';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="search" />} />
          </Route>
          <Route element={<FancyBackground />}>
            <Route path="search" element={<SearchPage />}>
              <Route path=":category/:workId" element={<DetailsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>
);
