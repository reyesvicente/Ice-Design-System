import type { Preview } from "@storybook/react-vite";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        offwhite: { name: "offwhite", value: "#FFFDF5" },
        black: { name: "black", value: "#0F0F0F" },
        yellow: { name: "yellow", value: "#FFDE59" },
        pink: { name: "pink", value: "#FF66C4" },
        blue: { name: "blue", value: "#5CE1E6" },
        green: { name: "green", value: "#7ED957" },
        purple: { name: "purple", value: "#C678DD" }
      }
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          ["Colors", "Typography", "Shadows"],
          "Components",
          ["Button", "Badge", "Card", "Input", "Alert", "Modal", "Table"],
        ],
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "offwhite"
    }
  }
};

export default preview;
