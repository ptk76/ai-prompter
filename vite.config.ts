import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: ".",
        },
      ],
    }),
  ],
  esbuild: {
    // pure: ["console.log"], // example: have esbuild remove any console.log
    minifyIdentifiers: false, // but keep variable names
    minifySyntax: false,
  },
  build: {
    outDir: "build",
    minify: "esbuild",
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: {
        // index: "./index.html",
        // worker: "./worker.html",
        page: "./page.html",
      },
      output: {
        assetFileNames: (file) => {
          console.log("ass", file.name);
          return "assets/[name].[ext]";
        },
        chunkFileNames: (file) => {
          console.log("chun", file.name);
          return "assets/[name].js";
        },

        entryFileNames: (file) => {
          console.log("entry", file.name);
          return "[name].js";
        },
      },
    },
  },
  server: {
    open: "/page.html",
  },
});
