import { createHtmlPlugin } from "vite-plugin-html";
import { defineConfig } from "vite";

import svgo from "vite-plugin-svgo";
import inlineSvg from "./src/viteScripts/inlineSvg";
import linkProcessor from "./src/viteScripts/linkProcessor";
import socialLinksProcessor from "./src/viteScripts/socialLinksProcessor";
import links from "./src/viteScripts/links.json";

export default defineConfig({
  base: "",
  assetsInclude: ["**/*.splinecode"],
  plugins: [
    svgo(),
    socialLinksProcessor(),
    inlineSvg(),
    linkProcessor(links),
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
