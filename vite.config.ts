import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // DIESE ZEILE HINZUFÜGEN ODER KORRIGIEREN:
  base: '/HERZSCHLAG/', 
  plugins: [react()],
})
