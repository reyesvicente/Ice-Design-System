import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true, exclude: ["**/*.stories.*"] }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      name: "IceDS",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        if (format === "es") return "index.js";
        if (format === "cjs") return "index.cjs";
        return "ice-ds.umd.js";
      },
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
});
