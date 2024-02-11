import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: './ssl/172.20.147.40-key.pem',
      cert: './ssl/172.20.147.40.pem'
    }
  },
  plugins: [react()],
})
