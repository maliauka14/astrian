import { createHtmlPlugin } from "vite-plugin-html";
import { defineConfig } from "vite";

export default defineConfig({
  assetsInclude: ["**/*.splinecode"],
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
