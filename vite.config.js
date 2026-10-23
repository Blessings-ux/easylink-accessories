import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // While you work on your computer, send /api requests to the backend
    proxy: { '/api': 'http://localhost:4000' },
  },
})