import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, './web'),
  build: {
    outDir: path.resolve(__dirname, './dist'),
    emptyOutDir: true,
  },
  plugins: [react(), glsl(),],
  html: {
    cspNonce: '{SERVER-CSP-NONCE}',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./web"),
    },
  },
})
