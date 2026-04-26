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
        /**
         * Split node_modules into focused vendor chunks so the browser can
         * cache each library independently and the main app chunk stays small.
         *
         * Chunk budget targets:
         *   vendor-react  ~150 kB   (react, react-dom)
         *   vendor-router  ~30 kB   (react-router-dom)
         *   vendor-redux   ~60 kB   (redux-toolkit, react-redux, redux-persist)
         *   vendor-mui    ~600 kB   (MUI + Emotion — tree-shaken via path imports)
         *   vendor-firebase ~400 kB (Firebase SDK)
         *   vendor-misc    <50 kB   (everything else)
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

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

          if (id.includes("/firebase/"))
            return "vendor-firebase";

          return "vendor-misc";
        },
      },
    },
  },
});
