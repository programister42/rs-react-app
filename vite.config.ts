import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { BASE_URL } from './src/api/urls';

// https://vite.dev/config/
export default defineConfig({
  base: BASE_URL,
  plugins: [react(), tailwindcss()],
});
