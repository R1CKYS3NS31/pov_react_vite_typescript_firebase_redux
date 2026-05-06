import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes("/react-dom/") || id.includes("/react/"))
              return "vendor-react";

            if (id.includes("/react-router"))
              return "vendor-router";

            if (
              id.includes("/@reduxjs/") ||
              id.includes("/react-redux/") ||
              id.includes("/redux-persist/")
          )
            return "vendor-redux";

          if (id.includes("/@mui/") || id.includes("/@emotion/") || id.includes("/notistack/"))
            return "vendor-mui";

            if (id.includes('@mui')) {
              return 'mui';
            }
            if (id.includes('firebase/auth')) {
              return 'firebase-auth';
            }
            if (id.includes('firebase/firestore')) {
              return 'firebase-firestore';
            }
            if (id.includes('firebase')) {
              return 'firebase-core';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
