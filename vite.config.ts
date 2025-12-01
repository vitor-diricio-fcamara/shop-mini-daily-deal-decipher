import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // Only load the react plugin when running tests (Vitest).
    // The shop-minis CLI automatically loads it during development/build,
    // so loading it here would cause a "double-injection" error.
    process.env.VITEST ? react() : undefined
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.tsx',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  server: {
    host: true,
    allowedHosts: [
      '.ngrok-free.dev',
      '.ngrok.io',
      '.ngrok.app',
      'localhost',
      '127.0.0.1',
    ],
  },
})
