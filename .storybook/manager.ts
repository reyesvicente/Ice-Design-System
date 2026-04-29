import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const iceTheme = create({
  base: "dark",
  brandTitle: "Ice Design System",
  brandUrl: "https://vicentereyes.org",
  brandTarget: "_self",

  colorPrimary: "#7ED957",
  colorSecondary: "#2BB5BA",
});

addons.setConfig({
  theme: iceTheme,
});