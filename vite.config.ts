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
      external: ["react", "react-dom", "react/jsx-runtime", /^@radix-ui\/.*/],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "@radix-ui/react-accordion": "RadixAccordion",
          "@radix-ui/react-avatar": "RadixAvatar",
          "@radix-ui/react-checkbox": "RadixCheckbox",
          "@radix-ui/react-dialog": "RadixDialog",
          "@radix-ui/react-dropdown-menu": "RadixDropdownMenu",
          "@radix-ui/react-popover": "RadixPopover",
          "@radix-ui/react-progress": "RadixProgress",
          "@radix-ui/react-radio-group": "RadixRadioGroup",
          "@radix-ui/react-separator": "RadixSeparator",
          "@radix-ui/react-slider": "RadixSlider",
          "@radix-ui/react-switch": "RadixSwitch",
          "@radix-ui/react-tabs": "RadixTabs",
          "@radix-ui/react-toast": "RadixToast",
          "@radix-ui/react-tooltip": "RadixTooltip",
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
