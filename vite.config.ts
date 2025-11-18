import { defineConfig } from 'vite'

export default defineConfig({
  base: "/miniwb/",
  build: {
    target: 'es2020'
  },
  server: {
    open: true
  }
})
