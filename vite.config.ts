import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import zipPack from "vite-plugin-zip-pack";

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
    zipPack({
      inDir: "build",
      outDir: "build-zip",
      outFileName: "arete.zip"
    })
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

export interface Options {
  /**
   * Input Directory
   * @default `build`
   */
  inDir?: string;
  /**
   * Output Directory
   * @default `dist-zip`
   */
  outDir?: string;
  /**
   * Zip Archive Name
   * @default `dist.zip`
   */
  outFileName?: string;
  /**
   * Path prefix for the files included in the zip file
   * @default ``
   */
  pathPrefix?: string;
  /**
   * Callback, which is executed after the zip file was created
   * err is only defined if the save function fails
   */
  done?: (err: Error | undefined) => void
  /**
   * Filter function equivalent to Array.prototype.filter 
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
   * is executed for every files and directories
   * files and directories are only included when return ist true.
   * All files are included when function is not defined
   */
  filter?: (fileName: string, filePath: string, isDirectory: boolean) => Boolean
  /**
   * Enable logging
   * @default true
   */
  enableLogging?: boolean;
}