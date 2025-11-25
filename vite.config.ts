import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true, // Allow external connections
    allowedHosts: [
      // Allow all ngrok hosts
      '.ngrok-free.dev',
      '.ngrok.io',
      '.ngrok.app',
      // Allow localhost for local development
      'localhost',
      '127.0.0.1',
    ],
  },
})

