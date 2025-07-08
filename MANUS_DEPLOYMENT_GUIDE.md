# Complete Deployment Instructions for Palestine-Israel Solidarity App

## Prerequisites
- Access to the repository: https://github.com/mutualmoralrespect/palestine-israel-solidarity-app
- GitHub authentication configured on your machine

## Step 1: Clone the Repository
```bash
git clone https://github.com/mutualmoralrespect/palestine-israel-solidarity-app.git
cd palestine-israel-solidarity-app
```

## Step 2: Install Dependencies
```bash
pnpm install
```

## Step 3: Update vite.config.js for Deployment
Replace the contents of `vite.config.js` with:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Base path configuration
  base: '/',
  
  // Build configuration optimized for deployment
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
          ],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['all']
  }
})
```

## Step 4: Build the Application
```bash
pnpm run build
```
This will create a `dist` directory with the production-ready files.

## Step 5: Deploy Using Manus

### Option 1: Using Manus CLI
If you have access to the Manus CLI:

```bash
# Navigate to the project directory
cd /path/to/palestine-israel-solidarity-app

# Deploy the application
manus deploy --framework react --project-dir .
```

### Option 2: Using Manus Web Interface
1. Go to the Manus deployment dashboard
2. Select "Deploy Frontend Application"
3. Choose "React" as the framework
4. Upload the `dist` directory or point to the project directory
5. Click "Deploy"

### Option 3: Using Manus API
```bash
curl -X POST https://api.manus.ai/deploy \
  -H "Authorization: Bearer YOUR_MANUS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "framework": "react",
    "projectDir": "/path/to/palestine-israel-solidarity-app",
    "branch": "main"  # or "dev" for development deployment
  }'
```

## Step 6: Verify Deployment
After deployment, Manus will provide a unique URL (e.g., `https://tsdosdwn.manus.space`). Visit this URL to verify that your application is working correctly.

## Troubleshooting

### Issue: Build Fails
- Check for syntax errors in your code
- Ensure all dependencies are installed: `pnpm install`
- Clear the cache: `pnpm cache clean`

### Issue: Deployment Fails
- Verify your Manus credentials
- Check that the `dist` directory exists and contains the built files
- Ensure you have the correct permissions to deploy

### Issue: Application Loads But Doesn't Work
- Check browser console for errors
- Verify that all API endpoints are correctly configured
- Ensure all environment variables are properly set

## For Different Environments

### Development Deployment
```bash
git checkout dev
pnpm install
pnpm run build
# Then follow deployment steps above
```

### Production Deployment
```bash
git checkout main
pnpm install
pnpm run build
# Then follow deployment steps above
```

These instructions should provide everything needed to deploy the Palestine-Israel Solidarity application using Manus, even if our chat disconnects.

