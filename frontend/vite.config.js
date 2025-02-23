import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
    tailwindcss(),
  ],
    server: {
        host: true, // allow external network access
        allowedHosts: ['db30-103-77-42-143.ngrok-free.app']
    }
})
