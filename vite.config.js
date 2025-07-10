import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react( ), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Base path configuration - critical for S3 deployment
  base: process.env.VITE_BASE_PATH || '/',
  
  // Build configuration optimized for S3
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // Set to true for debugging production builds
    // Optimize chunk size for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            // Add other UI libraries as needed
          ],
        },
        // Ensure asset filenames include content hash for cache busting
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  
  // Development server config (unchanged)
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['all']
  }
})
