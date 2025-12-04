import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths work on simple hosting
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});