import { createHtmlPlugin } from "vite-plugin-html";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
