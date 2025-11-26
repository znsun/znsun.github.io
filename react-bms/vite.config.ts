import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),  // Using default configuration to avoid babel-plugin-react-dev-locator dependency issues
    tsconfigPaths()
  ],
})
