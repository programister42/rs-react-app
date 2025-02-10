import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { BASE_PATH } from './src/api/urls';

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), tailwindcss()],
});
