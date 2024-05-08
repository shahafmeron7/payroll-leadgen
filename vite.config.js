import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    sourcemap: false,
    minify : true,
    cssMinify : true,
    reportCompressedSize:true
  },
  server:{
    open:true
  },
  plugins: [
    react(),
    envCompatible(),
    svgrPlugin({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
      // ...svgr options (https://react-svgr.com/docs/options/)
    }),
  ],
  resolve: {
    // src:"/src"

    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
