import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true, // Exit if port is in use
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // For development with self-signed certs
      }
    },
    cors: true, // Enable CORS for development
    open: true, // Automatically open browser
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  preview: {
    port: 5174
  }
})