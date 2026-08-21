import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Served at the root of https://rajdhakal.com.np (custom domain on GitHub Pages).
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
