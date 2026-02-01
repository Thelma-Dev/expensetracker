import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './frontend',
  server: {
    port: 5173,
    cors: true,
  },
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, './backend/types'),
      '@': path.resolve(__dirname, './frontend/src'),
    },
  },
    build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})