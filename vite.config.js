import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Served from https://<user>.github.io/ppm-portfolio/ via GitHub Pages.
  base: '/ppm-portfolio/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  }
})
