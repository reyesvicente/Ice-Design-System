import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/foundations/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],

  addons: ["@storybook/addon-links", "@storybook/addon-a11y", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  }
};

export default config;
