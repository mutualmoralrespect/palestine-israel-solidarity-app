import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Set base path from environment variable for S3 deployment
const base = process.env.VITE_BASE_PATH || '/';

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['all', '5174-ij77kzskzzo4q3xk058hr-c56a8101.manusvm.computer']
  }
})
