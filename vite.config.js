import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    /* Proxy removed for Client-Only V3 */
  },
  plugins: [react()],
})
