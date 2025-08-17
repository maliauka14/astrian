// vite-social-links-plugin.ts
import type { Plugin } from "vite";
import * as cheerio from "cheerio";
import { readFileSync } from "fs";
import { resolve } from "path";

const svgPaths = {
  instagram: resolve(__dirname, "../assets/svg/instagram.svg"),
  linkedin: resolve(__dirname, "../assets/svg/linkedin.svg"),
  dribble: resolve(__dirname, "../assets/svg/dribble.svg"),
  behance: resolve(__dirname, "../assets/svg/behance.svg"),
};

export default function socialLinksProcessor(): Plugin {
  return {
    name: "vite-social-links-plugin",
    enforce: "pre",
    transformIndexHtml(html) {
      try {
        const $ = cheerio.load(html);
        const socialContainers = $(".social-links");

        if (socialContainers.length === 0) return html;

        socialContainers.each((_, container) => {
          const $container = $(container);
          $container.empty();

          Object.entries(svgPaths).forEach(([name, path]) => {
            const svgContent = readFileSync(path, "utf-8");
            const li = $(`<li class="social-links__link"></li>`);
            const a = $(`<a href="https://${name}.com" target="_blank"></a>`);
            a.html(svgContent);
            li.append(a);
            $container.append(li);
          });
        });

        return $.html();
      } catch (error) {
        console.error("Error in social links processor:", error);
        return html;
      }
    },
  };
}
