import { createHtmlPlugin } from "vite-plugin-html";
import { defineConfig } from "vite";

import svgo from "vite-plugin-svgo";
import inlineSvg from "./src/scripts/inlineSvg";
import linkProcessor from "./src/scripts/linkProcessor";
import links from "./src/scripts/links.json";

export default defineConfig({
  base: "",
  assetsInclude: ["**/*.splinecode"],
  plugins: [
    svgo(),
    inlineSvg(),
    linkProcessor(links),
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
