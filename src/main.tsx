import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FancyBackground } from './components/FancyBackground';
import './index.css';
import { DetailsPage } from './pages/DetailsPage';
import { SearchPage } from './pages/SearchPage';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element');
}

const BASENAME = import.meta.env.BASE_URL;

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={BASENAME}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="search" />} />
          </Route>
          <Route element={<FancyBackground />}>
            <Route path="search" element={<SearchPage />}>
              <Route path=":category/:workId" element={<DetailsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
