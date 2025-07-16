import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Proxy configuration for local development:
  // Redirects API calls to the ASP.NET Core backend (HTTPS, self-signed cert)
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7170',
        changeOrigin: true,
        secure: false, // Accept self-signed certificate
      },
    },
  },
})
