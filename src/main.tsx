import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
