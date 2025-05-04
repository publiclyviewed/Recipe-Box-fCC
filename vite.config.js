import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Recipe-Box-fCC/', // 👈 this line is the key fix
  plugins: [react()],
})
