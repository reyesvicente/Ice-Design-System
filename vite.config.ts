import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { fileURLToPath, URL } from "node:url";

// Two builds share this config:
// - default: ESM + CJS for bundlers. react/jsx-runtime and Radix stay external so the
//   consumer's bundler dedupes them (bundling them caused a ReactCurrentDispatcher crash).
// - `--mode umd`: the <script>-tag bundle for CDNs. Only React and ReactDOM are external,
//   since they are the only dependencies that ship browser globals.
export default defineConfig(({ mode }) => {
  const isUmd = mode === "umd";

  return {
    plugins: [
      react(),
      !isUmd && dts({ insertTypesEntry: true, exclude: ["**/*.stories.*"] }),
    ],
    // Bundled dependencies reference process.env.NODE_ENV, which doesn't exist in browsers
    define: isUmd ? { "process.env.NODE_ENV": JSON.stringify("production") } : undefined,
    build: {
      // The UMD build runs second and must not wipe the ESM/CJS output
      emptyOutDir: !isUmd,
      lib: {
        entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
        name: "IceDS",
        formats: isUmd ? ["umd"] : ["es", "cjs"],
        fileName: (format) => {
          if (format === "es") return "index.js";
          if (format === "cjs") return "index.cjs";
          return "ice-ds.umd.js";
        },
      },
      rollupOptions: isUmd
        ? {
            external: ["react", "react-dom"],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
              },
            },
          }
        : {
            external: ["react", "react-dom", "react/jsx-runtime", /^@radix-ui\/.*/],
          },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
      },
    },
  };
});
